/**
 * check-policy-sources.mjs
 *
 * 1. Checks each policy URL in aiProvidersData.ts is still accessible.
 * 2. Fetches page content and compares a SHA-256 hash to the stored hash
 *    in scripts/policy-hashes.json — if the hash changed, the policy was updated.
 * 3. Updates lastChecked dates for reachable URLs in aiProvidersData.ts.
 * 4. Saves updated hashes back to policy-hashes.json.
 *
 * Exits with code 2 if any policy content changed (so CI can open an issue).
 * Exits with code 1 if any URL was unreachable.
 *
 * Usage: node scripts/check-policy-sources.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { createHash } from 'crypto';
import https from 'https';
import http from 'http';

const DATA_FILE   = 'client/src/lib/data/aiProvidersData.ts';
const HASHES_FILE = 'scripts/policy-hashes.json';
const TODAY       = new Date().toISOString().split('T')[0];

function headCheck(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.request(url, {
      method: 'HEAD',
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0 (AI Risk Checker policy bot)' },
    }, (res) => resolve(res.statusCode < 500));
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}

function fetchContent(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.request(url, {
      method: 'GET',
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    }, (res) => {
      if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) {
        fetchContent(res.headers.location).then(resolve);
        return;
      }
      if (res.statusCode >= 400) {
        resolve(null);
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf-8');
        // Extract only policy-content elements (headings, paragraphs, list items)
        // to avoid false positives from dynamic sidebars, ads, timestamps, etc.
        const policyText = [];
        const tagPattern = /<(h[1-6]|p|li)(?:\s[^>]*)?>([^<]*(?:<(?!\/(h[1-6]|p|li))[^>]*>[^<]*)*)<\/(?:h[1-6]|p|li)>/gi;
        let match;
        while ((match = tagPattern.exec(body)) !== null) {
          const text = match[2]
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#\d+;/g, '')
            .replace(/\s+/g, ' ')
            .trim();
          if (text.length > 20) policyText.push(text); // skip tiny/empty fragments
        }
        const fingerprint = policyText.join('\n');
        resolve(createHash('sha256').update(fingerprint).digest('hex'));
      });
      res.on('error', () => resolve(null));
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.end();
  });
}

async function main() {
  // Load existing hashes (empty object if first run)
  const storedHashes = existsSync(HASHES_FILE)
    ? JSON.parse(readFileSync(HASHES_FILE, 'utf-8'))
    : {};

  const content = readFileSync(DATA_FILE, 'utf-8');
  const lines = content.split('\n');

  // Extract { url, lineIndex } pairs from the data file
  const checks = [];
  for (let i = 0; i < lines.length; i++) {
    const urlMatch = lines[i].match(/^\s*url:\s*['"]([^'"]+)['"]/);
    if (!urlMatch) continue;
    const url = urlMatch[1];
    if (!url.startsWith('http')) continue;
    for (let j = i + 1; j <= Math.min(i + 5, lines.length - 1); j++) {
      if (lines[j].includes('lastChecked:')) {
        checks.push({ url, lineIndex: j });
        break;
      }
    }
  }

  console.log(`Found ${checks.length} policy URLs to check.\n`);

  let updated    = 0;
  let failed     = 0;
  let newHashes  = { ...storedHashes };
  const changed  = []; // URLs where content hash changed

  for (const { url, lineIndex } of checks) {
    process.stdout.write(`Checking ${url} ... `);
    const hash = await fetchContent(url);

    if (hash === null) {
      // GET failed — fall back to HEAD to confirm reachability
      const reachable = await headCheck(url);
      if (!reachable) {
        console.log('✗ UNREACHABLE — keeping old date');
        failed++;
        continue;
      }
      // Reachable but blocks content fetch (e.g. bot protection) — track as opaque
      console.log('✓ (bot-protected — reachability only)');
      newHashes[url] = storedHashes[url] ?? 'BLOCKED';
    } else {
      const previous = storedHashes[url];
      if (!previous || previous === 'BLOCKED') {
        console.log('✓ (new — hash stored)');
      } else if (previous !== hash) {
        console.log('⚠ CONTENT CHANGED');
        changed.push(url);
      } else {
        console.log('✓ unchanged');
      }
      newHashes[url] = hash;
    }

    lines[lineIndex] = lines[lineIndex].replace(
      /lastChecked:\s*'[^']+'/,
      `lastChecked: '${TODAY}'`
    );
    updated++;
  }

  // Write updated data file and hashes
  writeFileSync(DATA_FILE, lines.join('\n'));
  writeFileSync(HASHES_FILE, JSON.stringify(newHashes, null, 2) + '\n');

  console.log(`\nDone. Updated: ${updated}  Unreachable: ${failed}  Changed: ${changed.length}`);

  if (changed.length > 0) {
    console.log('\n⚠ POLICY CHANGES DETECTED:');
    changed.forEach((url) => console.log(`  - ${url}`));
    // Write changed URLs to a file so the CI workflow can read them
    writeFileSync('scripts/policy-changes.txt', changed.join('\n') + '\n');
    process.exit(2);
  }

  if (failed > 0) {
    console.warn(`\nWARNING: ${failed} URL(s) could not be reached.`);
    process.exit(1);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
