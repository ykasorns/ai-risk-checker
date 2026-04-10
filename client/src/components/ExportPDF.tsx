import { Download, FileText } from 'lucide-react';
import { useState } from 'react';

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
      // Dynamic import html2pdf
      const html2pdfModule = await import('html2pdf.js') as any;
      const html2pdf = html2pdfModule.default || html2pdfModule;

      // Create HTML content
      const htmlContent = generateHTMLContent(options);

      // Create a temporary container
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      element.style.display = 'block';
      element.style.position = 'fixed';
      element.style.left = '-9999px';
      element.style.top = '-9999px';
      element.style.width = '210mm';
      element.style.height = '297mm';
      document.body.appendChild(element);

      // PDF options
      const opt: any = {
        margin: 10,
        filename: `AI-Risk-Assessment-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'JPEG', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
        pagebreak: { mode: ['css', 'legacy'] },
      };

      // Generate PDF
      await html2pdf().set(opt).from(element).save().then(() => {
        // Clean up
        document.body.removeChild(element);
      }).catch((error: any) => {
        console.error('PDF generation error:', error);
        // Clean up on error
        if (document.body.contains(element)) {
          document.body.removeChild(element);
        }
        throw error;
      });

      onExport?.(options);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to text export if html2pdf fails
      fallbackTextExport(options);
    } finally {
      setIsExporting(false);
    }
  };

  const fallbackTextExport = (opts: ExportOptions) => {
    const content = generatePDFContent(opts);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AI-Risk-Assessment-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleCheckboxChange = (key: keyof ExportOptions) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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

      {/* Export Options */}
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-sm mb-3">Select sections to include:</h4>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={options.includeDashboard}
            onChange={() => handleCheckboxChange('includeDashboard')}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm">
            <span className="font-medium">Dashboard Summary</span>
            <span className="text-gray-600 block text-xs">Risk distribution, compliance scores, trends</span>
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={options.includeRiskAssessment}
            onChange={() => handleCheckboxChange('includeRiskAssessment')}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm">
            <span className="font-medium">Risk Assessment Results</span>
            <span className="text-gray-600 block text-xs">AI provider analysis and risk levels</span>
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={options.includeCompliance}
            onChange={() => handleCheckboxChange('includeCompliance')}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm">
            <span className="font-medium">Compliance Recommendations</span>
            <span className="text-gray-600 block text-xs">GDPR and PDPA compliance guidelines</span>
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={options.includeChecklist}
            onChange={() => handleCheckboxChange('includeChecklist')}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm">
            <span className="font-medium">Compliance Checklist</span>
            <span className="text-gray-600 block text-xs">Audit checklist for compliance verification</span>
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={options.includeHistory}
            onChange={() => handleCheckboxChange('includeHistory')}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm">
            <span className="font-medium">Provider History</span>
            <span className="text-gray-600 block text-xs">Policy changes and updates timeline</span>
          </span>
        </label>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        {isExporting ? 'Generating Report...' : 'Export to PDF'}
      </button>

      {/* Info Box */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          <span className="font-semibold">✓ Ready to export:</span> Your compliance report will include all selected sections
          and can be shared with management, auditors, or compliance teams.
        </p>
      </div>
    </div>
  );
}

function generateHTMLContent(options: ExportOptions): string {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 20px;
        }
        h1 { color: #2e3192; font-size: 24px; margin-bottom: 10px; }
        h2 { color: #1b75bc; font-size: 18px; margin-top: 20px; margin-bottom: 10px; border-bottom: 2px solid #6dcff6; padding-bottom: 5px; }
        h3 { color: #2e3192; font-size: 14px; margin-top: 15px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 20px; }
        .item { margin-left: 20px; margin-bottom: 10px; }
        .checklist { margin-left: 20px; }
        .checklist-item { margin-bottom: 8px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>AI RISK CHECKER</h1>
        <h2 style="border: none; color: #666; font-size: 14px;">Compliance Report</h2>
        <p>Generated: ${date}</p>
      </div>
  `;

  if (options.includeDashboard) {
    html += `
      <div class="section">
        <h2>Dashboard Summary</h2>
        <div class="item">
          <h3>Key Metrics</h3>
          <ul>
            <li>Total AI Providers: 4</li>
            <li>High Risk Models: 3</li>
            <li>Compliance Score: 82%</li>
            <li>Compliant Models: 2</li>
          </ul>
        </div>
        <div class="item">
          <h3>Risk Distribution</h3>
          <ul>
            <li>Low Risk: 2 models</li>
            <li>Medium Risk: 1 model</li>
            <li>High Risk: 3 models</li>
            <li>Very High Risk: 1 model</li>
          </ul>
        </div>
      </div>
    `;
  }

  if (options.includeRiskAssessment) {
    html += `
      <div class="section">
        <h2>Risk Assessment Results</h2>
        <div class="item">
          <h3>OpenAI</h3>
          <ul>
            <li>ChatGPT Free: High Risk (75%)</li>
            <li>ChatGPT Business: Low Risk (25%)</li>
            <li>ChatGPT Enterprise: Low Risk (25%)</li>
          </ul>
        </div>
        <div class="item">
          <h3>Google Gemini</h3>
          <ul>
            <li>Gemini Apps: Very High Risk (100%)</li>
            <li>Gemini for Workspace: Low Risk (25%)</li>
          </ul>
        </div>
        <div class="item">
          <h3>Anthropic Claude</h3>
          <ul>
            <li>Claude Free/Pro: Medium Risk (50%)</li>
            <li>Claude Team/Enterprise: Low Risk (25%)</li>
          </ul>
        </div>
        <div class="item">
          <h3>Microsoft Copilot</h3>
          <ul>
            <li>Copilot Free: High Risk (75%)</li>
            <li>Copilot with Commercial Data Protection: Low Risk (25%)</li>
          </ul>
        </div>
      </div>
    `;
  }

  if (options.includeCompliance) {
    html += `
      <div class="section">
        <h2>Compliance Recommendations</h2>
        <div class="item">
          <h3>GDPR Compliance</h3>
          <ul>
            <li>Use Enterprise/Team plans with no data training</li>
            <li>Implement Data Processing Agreements (DPA)</li>
            <li>Conduct Data Protection Impact Assessment (DPIA)</li>
            <li>Ensure data subject rights are honored</li>
          </ul>
        </div>
        <div class="item">
          <h3>PDPA Compliance</h3>
          <ul>
            <li>Use plans that do not use data for training</li>
            <li>Implement proper consent mechanisms</li>
            <li>Maintain audit logs of all AI usage</li>
            <li>Ensure data residency in Thailand or compliant regions</li>
          </ul>
        </div>
      </div>
    `;
  }

  if (options.includeChecklist) {
    html += `
      <div class="section">
        <h2>Compliance Audit Checklist</h2>
        <div class="item">
          <h3>For High Risk</h3>
          <div class="checklist">
            <div class="checklist-item">☐ Legal Review Required</div>
            <div class="checklist-item">☐ DPIA Completion</div>
            <div class="checklist-item">☐ Consent Management</div>
            <div class="checklist-item">☐ Data Minimization</div>
            <div class="checklist-item">☐ Security Assessment</div>
            <div class="checklist-item">☐ Data Residency Check</div>
            <div class="checklist-item">☐ Audit & Monitoring</div>
            <div class="checklist-item">☐ Incident Response Plan</div>
            <div class="checklist-item">☐ User Rights Implementation</div>
            <div class="checklist-item">☐ Vendor Assessment</div>
          </div>
        </div>
      </div>
    `;
  }

  if (options.includeHistory) {
    html += `
      <div class="section">
        <h2>Provider Policy Changes</h2>
        <div class="item">
          <p>Recent updates from AI providers:</p>
          <ul>
            <li>OpenAI: Enhanced Data Retention Controls (Dec 2025)</li>
            <li>Google Gemini: Workspace Privacy Controls (Dec 2025)</li>
            <li>Anthropic Claude: Custom Data Retention Policies (Dec 2025)</li>
            <li>Microsoft Copilot: Commercial Data Protection Enhancement (Dec 2025)</li>
          </ul>
        </div>
      </div>
    `;
  }

  html += `
    <div class="footer">
      <h3>Report Notes</h3>
      <p>This report is generated for compliance and risk assessment purposes. Always review the official terms of service and privacy policies of each AI provider. Data practices may change, and different regions may have different policies.</p>
      <p>For more information, visit: https://ai-risk-checker.manus.space</p>
      <p style="margin-top: 20px; text-align: center; color: #999;">--- End of Report ---</p>
    </div>
    </body>
    </html>
  `;

  return html;
}

function generatePDFContent(options: ExportOptions): string {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let content = `AI RISK CHECKER - COMPLIANCE REPORT
Generated: ${date}
=====================================\n\n`;

  if (options.includeDashboard) {
    content += `DASHBOARD SUMMARY
-----------------
Total AI Providers: 4
High Risk Models: 3
Compliance Score: 82%
Compliant Models: 2

Risk Distribution:
- Low Risk: 2 models
- Medium Risk: 1 model
- High Risk: 3 models
- Very High Risk: 1 model

\n`;
  }

  if (options.includeRiskAssessment) {
    content += `RISK ASSESSMENT RESULTS
-----------------------
OpenAI:
  - ChatGPT Free: High Risk (75%)
  - ChatGPT Business: Low Risk (25%)
  - ChatGPT Enterprise: Low Risk (25%)

Google Gemini:
  - Gemini Apps: Very High Risk (100%)
  - Gemini for Workspace: Low Risk (25%)

Anthropic Claude:
  - Claude Free/Pro: Medium Risk (50%)
  - Claude Team/Enterprise: Low Risk (25%)

Microsoft Copilot:
  - Copilot Free: High Risk (75%)
  - Copilot with Commercial Data Protection: Low Risk (25%)

\n`;
  }

  if (options.includeCompliance) {
    content += `COMPLIANCE RECOMMENDATIONS
---------------------------
GDPR Compliance:
- Use Enterprise/Team plans with no data training
- Implement Data Processing Agreements (DPA)
- Conduct Data Protection Impact Assessment (DPIA)
- Ensure data subject rights are honored

PDPA Compliance:
- Use plans that do not use data for training
- Implement proper consent mechanisms
- Maintain audit logs of all AI usage
- Ensure data residency in Thailand or compliant regions

\n`;
  }

  if (options.includeChecklist) {
    content += `COMPLIANCE AUDIT CHECKLIST
---------------------------
For High Risk:
☐ Legal Review Required
☐ DPIA Completion
☐ Consent Management
☐ Data Minimization
☐ Security Assessment
☐ Data Residency Check
☐ Audit & Monitoring
☐ Incident Response Plan
☐ User Rights Implementation
☐ Vendor Assessment

\n`;
  }

  if (options.includeHistory) {
    content += `PROVIDER POLICY CHANGES
-----------------------
Recent updates from AI providers:
- OpenAI: Enhanced Data Retention Controls (Dec 2025)
- Google Gemini: Workspace Privacy Controls (Dec 2025)
- Anthropic Claude: Custom Data Retention Policies (Dec 2025)
- Microsoft Copilot: Commercial Data Protection Enhancement (Dec 2025)

\n`;
  }

  content += `REPORT NOTES
-----------
This report is generated for compliance and risk assessment purposes.
Always review the official terms of service and privacy policies of each AI provider.
Data practices may change, and different regions may have different policies.

For more information, visit: https://ai-risk-checker.manus.space

=====================================
End of Report`;

  return content;
}
