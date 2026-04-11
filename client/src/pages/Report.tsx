import { useState } from 'react';
import { aiProviders } from '@/lib/data/aiProvidersData';
import { complianceData } from '@/lib/data/complianceData';
import { complianceChecklists } from '@/lib/data/complianceChecklistData';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { RiskMeter } from '@/components/RiskMeter';
import { MainNavigation } from '@/components/MainNavigation';

interface ReportState {
  selectedProvider: string;
  selectedVersion: string;
  selectedDataTypes: string[];
}

const dataTypeOptions = [
  'Personal Information',
  'Financial Data',
  'Health Information',
  'Business Confidential',
  'Legal Documents',
  'Public Information',
];

export default function Report() {
  const [state, setState] = useState<ReportState>({
    selectedProvider: 'openai',
    selectedVersion: 'free',
    selectedDataTypes: [],
  });
  const [showPreview, setShowPreview] = useState(false);

  const selectedProvider = aiProviders.find((p) => p.id === state.selectedProvider);
  const selectedVersionData = selectedProvider?.versions.find((v) => v.id === state.selectedVersion);

  const handleDataTypeChange = (type: string) => {
    setState((prev) => ({
      ...prev,
      selectedDataTypes: prev.selectedDataTypes.includes(type)
        ? prev.selectedDataTypes.filter((t) => t !== type)
        : [...prev.selectedDataTypes, type],
    }));
  };

  const generateReport = () => {
    if (!selectedVersionData || state.selectedDataTypes.length === 0) {
      alert('Please select a provider, version, and at least one data type');
      return;
    }
    setShowPreview(true);
  };

  const gdprRecommendations = selectedVersionData
    ? complianceData.GDPR.recommendations[selectedVersionData.riskLevel] || []
    : [];

  const exportReport = () => {
    if (!selectedVersionData) return;

    const gdprRecommendations = complianceData.GDPR.recommendations[selectedVersionData.riskLevel] || [];
    const pdpaRecommendations = complianceData.PDPA.recommendations[selectedVersionData.riskLevel] || [];
    const checklist = complianceChecklists[selectedVersionData.riskLevel];

    let reportContent = `COMPLIANCE REPORT\n`;
    reportContent += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    reportContent += `AI PROVIDER: ${selectedProvider?.name}\n`;
    reportContent += `VERSION: ${selectedVersionData.name}\n`;
    reportContent += `PLAN: ${selectedVersionData.plan}\n\n`;
    reportContent += `RISK LEVEL: ${selectedVersionData.riskLevel.toUpperCase()}\n\n`;
    reportContent += `DATA TYPES ASSESSED:\n`;
    state.selectedDataTypes.forEach((type: string) => {
      reportContent += `- ${type}\n`;
    });
    reportContent += `\nDESCRIPTION:\n${selectedVersionData.description}\n\n`;
    reportContent += `COMPLIANCE STATUS:\n`;
    reportContent += `- GDPR: ${complianceData.GDPR.requirements}\n`;
    reportContent += `- PDPA: ${complianceData.PDPA.requirements}\n\n`;
    reportContent += `KEY REQUIREMENTS:\n`;
    complianceData.GDPR.requirements.forEach((req: string) => {
      reportContent += `- ${req}\n`;
    });
    reportContent += `\nRECOMMENDATIONS:\n`;
    gdprRecommendations.forEach((rec: string) => {
      reportContent += `- ${rec}\n`;
    });
    reportContent += `\nCOMPLIANCE CHECKLIST ITEMS:\n`;
    checklist.forEach((item: any) => {
      reportContent += `[ ] ${item.title}\n`;
      reportContent += `    Priority: ${item.priority}\n`;
      reportContent += `    Description: ${item.description}\n\n`;
    });

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-report-${selectedProvider?.id}-${selectedVersionData.id}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Compliance Report Generator</h1>
            <p className="text-gray-600">
              Generate a comprehensive compliance report for your AI usage based on your provider and data types.
            </p>
          </div>

          {!showPreview ? (
            <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
              {/* Provider Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Select AI Provider
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {aiProviders.map((provider: any) => (
                    <button
                      key={provider.id}
                      onClick={() =>
                        setState({
                          ...state,
                          selectedProvider: provider.id,
                          selectedVersion: provider.versions[0].id,
                        })
                      }
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        state.selectedProvider === provider.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{provider.logo}</div>
                      <p className="font-semibold text-gray-900">{provider.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Version Selection */}
              {selectedProvider && (
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Select Version/Plan
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProvider.versions.map((version: any) => (
                      <button
                        key={version.id}
                        onClick={() => setState({ ...state, selectedVersion: version.id })}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          state.selectedVersion === version.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-900">{version.name}</h3>
                          <RiskMeter level={version.riskLevel} size="sm" />
                        </div>
                        <p className="text-sm text-gray-600">{version.plan}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Types Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Data Types to Assess
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dataTypeOptions.map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={state.selectedDataTypes.includes(type)}
                        onChange={() => handleDataTypeChange(type)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button onClick={generateReport} className="w-full bg-blue-600 hover:bg-blue-700">
                Generate Report
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Report Preview */}
              <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Report Preview</h2>
                  <div className="space-x-3">
                    <Button onClick={exportReport} variant="outline" className="gap-2">
                      <Download size={18} />
                      Export
                    </Button>
                    <Button onClick={() => window.print()} variant="outline" className="gap-2">
                      <Printer size={18} />
                      Print
                    </Button>
                  </div>
                </div>

                {selectedVersionData && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-gray-200 pb-6">
                      <p className="text-sm text-gray-600 mb-2">Generated: {new Date().toLocaleDateString()}</p>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedProvider?.name}</h3>
                      <p className="text-lg text-gray-700">{selectedVersionData.name}</p>
                    </div>

                    {/* Risk Assessment */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-4">Risk Assessment</h4>
                      <div className="flex items-center gap-4">
                        <RiskMeter level={selectedVersionData.riskLevel} size="lg" />
                        <div>
                          <p className="text-sm text-gray-600">
                            {selectedVersionData.riskLevel === 'low' &&
                              'This AI service is suitable for sensitive data with enterprise-grade security.'}
                            {selectedVersionData.riskLevel === 'medium' &&
                              'This AI service has moderate risk. User controls data usage.'}
                            {selectedVersionData.riskLevel === 'high' &&
                              'This AI service has high risk. Avoid personal/financial information.'}
                            {selectedVersionData.riskLevel === 'very-high' &&
                              'This AI service has very high risk. Only use for public information.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Data Types Assessed */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Data Types Assessed</h4>
                      <ul className="space-y-2">
                        {state.selectedDataTypes.map((type) => (
                          <li key={type} className="text-gray-700 flex items-center gap-2">
                            <span className="text-blue-600">✓</span>
                            {type}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Compliance Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2">🇪🇺 GDPR Status</h4>
                        <p className="text-sm text-gray-700">
                          Generally Compliant
                        </p>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2">🇹🇭 PDPA Status</h4>
                        <p className="text-sm text-gray-700">
                          Generally Compliant
                        </p>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {gdprRecommendations.map(
                          (rec: string, idx: number) => (
                            <li key={idx} className="text-gray-700 flex items-start gap-2">
                              <span className="text-blue-600 flex-shrink-0">→</span>
                              <span>{rec}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <Button onClick={() => setShowPreview(false)} variant="outline" className="w-full">
                Back to Form
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
