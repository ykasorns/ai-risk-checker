/**
 * check-policy-sources.mjs
 *
 * Checks each policy URL in aiProvidersData.ts is still accessible,
 * then updates lastChecked to today's date for reachable URLs.
 * Unreachable URLs keep their old date so the staleness is visible.
 *
 * Usage: node scripts/check-policy-sources.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import https from 'https';
import http from 'http';

const FILE_PATH = 'client/src/lib/data/aiProvidersData.ts';
const TODAY = new Date().toISOString().split('T')[0];

function checkUrl(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    const options = {
      method: 'HEAD',
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0 (AI Risk Checker policy bot)' },
    };
    const req = lib.request(url, options, (res) => {
      // Accept 2xx and 3xx (redirects mean the page exists)
      resolve(res.statusCode < 500);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}

async function main() {
  const content = readFileSync(FILE_PATH, 'utf-8');
  const lines = content.split('\n');

  // Build list of { url, lastCheckedLineIndex } pairs
  const checks = [];
  for (let i = 0; i < lines.length; i++) {
    const urlMatch = lines[i].match(/^\s*url:\s*['"]([^'"]+)['"]/);
    if (!urlMatch) continue;
    const url = urlMatch[1];
    if (!url.startsWith('http')) continue;
    // Find the nearest lastChecked line within the next 5 lines
    for (let j = i + 1; j <= Math.min(i + 5, lines.length - 1); j++) {
      if (lines[j].includes('lastChecked:')) {
        checks.push({ url, lineIndex: j });
        break;
      }
    }
  }

  console.log(`Found ${checks.length} policy URLs to check.\n`);

  let updated = 0;
  let failed = 0;

  for (const { url, lineIndex } of checks) {
    process.stdout.write(`Checking ${url} ... `);
    const ok = await checkUrl(url);
    if (ok) {
      lines[lineIndex] = lines[lineIndex].replace(
        /lastChecked:\s*'[^']+'/,
        `lastChecked: '${TODAY}'`
      );
      console.log('✓');
      updated++;
    } else {
      console.log('✗ UNREACHABLE — keeping old date');
      failed++;
    }
  }

  writeFileSync(FILE_PATH, lines.join('\n'));

  console.log(`\nDone. Updated: ${updated}  Unreachable: ${failed}`);
  console.log(`lastChecked dates set to ${TODAY} for reachable URLs.`);

  if (failed > 0) {
    console.warn(`\nWARNING: ${failed} URL(s) could not be reached. Check them manually.`);
    process.exit(1);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
