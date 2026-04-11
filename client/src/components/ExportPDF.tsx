import { Download, FileText } from 'lucide-react';
import { useState } from 'react';
import { aiProviders } from '@/lib/data/aiProvidersData';
import { complianceData } from '@/lib/data/complianceData';
import { complianceChecklists } from '@/lib/data/complianceChecklistData';
import { providerHistory } from '@/lib/data/providerHistoryData';

export interface ExportOptions {
  includeDashboard: boolean;
  includeRiskAssessment: boolean;
  includeCompliance: boolean;
  includeChecklist: boolean;
  includeHistory: boolean;
}

interface ExportPDFProps {
  onExport?: (options: ExportOptions) => void;
}

export function ExportPDF({ onExport }: ExportPDFProps) {
  const [options, setOptions] = useState<ExportOptions>({
    includeDashboard: true,
    includeRiskAssessment: true,
    includeCompliance: true,
    includeChecklist: false,
    includeHistory: false,
  });
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const html2pdfModule = (await import('html2pdf.js')) as any;
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const element = document.createElement('div');
      element.innerHTML = generateHTMLContent(options);
      element.style.cssText = 'display:block;position:fixed;left:-9999px;top:-9999px;width:210mm;';
      document.body.appendChild(element);

      const opt = {
        margin: 10,
        filename: `AI-Risk-Assessment-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'JPEG', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
        pagebreak: { mode: ['css', 'legacy'] },
      };

      await html2pdf()
        .set(opt)
        .from(element)
        .save()
        .finally(() => {
          if (document.body.contains(element)) document.body.removeChild(element);
        });

      onExport?.(options);
    } catch {
      fallbackTextExport(options);
    } finally {
      setIsExporting(false);
    }
  };

  const fallbackTextExport = (opts: ExportOptions) => {
    const content = generateTextContent(opts);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Risk-Assessment-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleOption = (key: keyof ExportOptions) =>
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));

  const checkboxItems: { key: keyof ExportOptions; label: string; sub: string }[] = [
    { key: 'includeDashboard', label: 'Dashboard Summary', sub: 'Provider count, risk model counts, safe model rate' },
    { key: 'includeRiskAssessment', label: 'Risk Assessment Results', sub: 'All AI providers and their risk levels' },
    { key: 'includeCompliance', label: 'Compliance Recommendations', sub: 'GDPR and PDPA guidelines from official data' },
    { key: 'includeChecklist', label: 'Compliance Checklist', sub: 'Audit checklist for high-risk usage' },
    { key: 'includeHistory', label: 'Provider History', sub: 'Policy changes timeline from all providers' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Export Compliance Report
        </h3>
        <p className="text-gray-600 text-sm">
          Generate a comprehensive compliance report in PDF format for management review and archival.
        </p>
      </div>

      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-sm mb-3">Select sections to include:</h4>
        {checkboxItems.map(({ key, label, sub }) => (
          <label
            key={key}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
          >
            <input
              type="checkbox"
              checked={options[key]}
              onChange={() => toggleOption(key)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm">
              <span className="font-medium">{label}</span>
              <span className="text-gray-600 block text-xs">{sub}</span>
            </span>
          </label>
        ))}
      </div>

      <button
        onClick={handleExport}
        disabled={isExporting}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        {isExporting ? 'Generating Report...' : 'Export to PDF'}
      </button>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          <span className="font-semibold">✓ Ready to export:</span> Report is generated from live provider data
          and can be shared with management, auditors, or compliance teams.
        </p>
      </div>
    </div>
  );
}

function generateHTMLContent(options: ExportOptions): string {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const allVersions = aiProviders.flatMap((p) => p.versions);
  const highRisk = allVersions.filter((v) => v.riskLevel === 'high' || v.riskLevel === 'very-high').length;
  const safeRate = Math.round((allVersions.filter((v) => !v.dataUsedForTraining).length / allVersions.length) * 100);

  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    body{font-family:Arial,sans-serif;line-height:1.6;color:#333;margin:0;padding:20px}
    h1{color:#2e3192;font-size:22px}h2{color:#1b75bc;font-size:16px;border-bottom:2px solid #6dcff6;padding-bottom:4px;margin-top:20px}
    h3{color:#2e3192;font-size:13px;margin-top:12px}ul{margin:6px 0}li{margin-bottom:4px}
    .header{text-align:center;margin-bottom:24px}.footer{margin-top:28px;padding-top:16px;border-top:1px solid #ddd;font-size:11px;color:#666}
    table{width:100%;border-collapse:collapse;margin:8px 0}th,td{border:1px solid #ddd;padding:6px;text-align:left;font-size:12px}th{background:#f0f0f0}
  </style></head><body>
  <div class="header"><h1>AI RISK CHECKER — Compliance Report</h1><p style="color:#666;font-size:13px">Generated: ${date}</p></div>`;

  if (options.includeDashboard) {
    html += `<h2>Dashboard Summary</h2>
    <table><tr><th>Metric</th><th>Value</th></tr>
    <tr><td>Total AI Providers</td><td>${aiProviders.length}</td></tr>
    <tr><td>Total Plans / Versions</td><td>${allVersions.length}</td></tr>
    <tr><td>High / Very High Risk Plans</td><td>${highRisk}</td></tr>
    <tr><td>Safe Models (No Training Data)</td><td>${safeRate}%</td></tr>
    </table>`;
  }

  if (options.includeRiskAssessment) {
    html += `<h2>Risk Assessment Results</h2>`;
    for (const provider of aiProviders) {
      html += `<h3>${provider.logo} ${provider.name}</h3><table>
      <tr><th>Plan</th><th>Risk</th><th>Training</th><th>Human Review</th><th>Encryption</th></tr>`;
      for (const v of provider.versions) {
        html += `<tr><td>${v.name}</td><td>${v.riskLevel.toUpperCase()}</td>
        <td>${v.dataUsedForTraining ? '⚠️ Yes' : '✅ No'}</td>
        <td>${v.humanReview ? '⚠️ Yes' : '✅ No'}</td><td>${v.encryption}</td></tr>`;
      }
      html += `</table>`;
    }
  }

  if (options.includeCompliance) {
    html += `<h2>Compliance Recommendations</h2>`;
    for (const [key, framework] of Object.entries(complianceData)) {
      html += `<h3>${framework.framework}</h3><ul>`;
      framework.requirements.forEach((r: string) => { html += `<li>${r}</li>`; });
      html += `</ul>`;
    }
  }

  if (options.includeChecklist) {
    html += `<h2>Compliance Checklist — High Risk</h2><table>
    <tr><th>Category</th><th>Task</th><th>Priority</th><th>GDPR</th><th>PDPA</th></tr>`;
    complianceChecklists['high'].forEach((item) => {
      html += `<tr><td>${item.category}</td><td>${item.task}</td><td>${item.priority}</td>
      <td>${item.gdprRelevant ? '✓' : ''}</td><td>${item.pdpaRelevant ? '✓' : ''}</td></tr>`;
    });
    html += `</table>`;
  }

  if (options.includeHistory) {
    html += `<h2>Provider Policy History</h2>`;
    for (const ph of providerHistory) {
      html += `<h3>${ph.provider}</h3><ul>`;
      ph.changes.slice(0, 5).forEach((c) => {
        const d = new Date(c.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        html += `<li><strong>${d} — ${c.title}</strong> (${c.impact}): ${c.description}</li>`;
      });
      html += `</ul>`;
    }
  }

  html += `<div class="footer"><p>This report is based on official AI provider documentation. Always review current terms of service before use.</p></div></body></html>`;
  return html;
}

function generateTextContent(options: ExportOptions): string {
  const date = new Date().toLocaleDateString();
  const allVersions = aiProviders.flatMap((p) => p.versions);
  const highRisk = allVersions.filter((v) => v.riskLevel === 'high' || v.riskLevel === 'very-high').length;
  const safeRate = Math.round((allVersions.filter((v) => !v.dataUsedForTraining).length / allVersions.length) * 100);

  let out = `AI RISK CHECKER — COMPLIANCE REPORT\nGenerated: ${date}\n${'='.repeat(50)}\n\n`;

  if (options.includeDashboard) {
    out += `DASHBOARD SUMMARY\n${'-'.repeat(20)}\nProviders: ${aiProviders.length}\nHigh/Very High Risk Plans: ${highRisk}\nSafe Models (No Training): ${safeRate}%\n\n`;
  }

  if (options.includeRiskAssessment) {
    out += `RISK ASSESSMENT\n${'-'.repeat(20)}\n`;
    aiProviders.forEach((p) => {
      out += `\n${p.name}\n`;
      p.versions.forEach((v) => {
        out += `  ${v.name} [${v.riskLevel.toUpperCase()}] Training: ${v.dataUsedForTraining ? 'Yes' : 'No'}\n`;
      });
    });
    out += '\n';
  }

  if (options.includeCompliance) {
    out += `COMPLIANCE RECOMMENDATIONS\n${'-'.repeat(20)}\n`;
    Object.values(complianceData).forEach((f) => {
      out += `\n${f.framework}\n`;
      f.requirements.forEach((r: string) => { out += `  - ${r}\n`; });
    });
    out += '\n';
  }

  if (options.includeChecklist) {
    out += `COMPLIANCE CHECKLIST (High Risk)\n${'-'.repeat(20)}\n`;
    complianceChecklists['high'].forEach((item) => {
      out += `☐ [${item.priority.toUpperCase()}] ${item.task}\n  ${item.description}\n`;
    });
    out += '\n';
  }

  if (options.includeHistory) {
    out += `PROVIDER HISTORY\n${'-'.repeat(20)}\n`;
    providerHistory.forEach((ph) => {
      out += `\n${ph.provider}\n`;
      ph.changes.slice(0, 5).forEach((c) => {
        const d = new Date(c.date).toLocaleDateString();
        out += `  ${d} — ${c.title} (${c.impact})\n`;
      });
    });
  }

  out += `\n${'='.repeat(50)}\nEnd of Report`;
  return out;
}
