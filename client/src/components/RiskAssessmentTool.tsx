import { aiProviders, dataCategories, riskLevelDescriptions } from '@/lib/data/aiProvidersData';
import { useState } from 'react';
import { RiskMeter } from './RiskMeter';

export function RiskAssessmentTool() {
  const [selectedProviderId, setSelectedProviderId] = useState<string>(aiProviders[0].id);
  const [selectedVersionId, setSelectedVersionId] = useState<string>(
    aiProviders[0].versions[0].id
  );
  const [selectedDataCategories, setSelectedDataCategories] = useState<string[]>([]);

  const provider = aiProviders.find((p) => p.id === selectedProviderId);
  const version = provider?.versions.find((v) => v.id === selectedVersionId);

  const handleProviderChange = (newProviderId: string) => {
    setSelectedProviderId(newProviderId);
    const newProvider = aiProviders.find((p) => p.id === newProviderId);
    if (newProvider) {
      setSelectedVersionId(newProvider.versions[0].id);
    }
  };

  const handleDataCategoryToggle = (categoryName: string) => {
    setSelectedDataCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((c) => c !== categoryName) : [...prev, categoryName]
    );
  };

  // Calculate overall risk based on version risk and selected data categories
  const calculateOverallRisk = () => {
    if (!version || selectedDataCategories.length === 0) {
      return version?.riskLevel || 'low';
    }

    const riskScores = {
      low: 1,
      medium: 2,
      high: 3,
      'very-high': 4,
    };

    const riskLevels = ['low', 'medium', 'high', 'very-high'] as const;
    const baseScore = riskScores[version.riskLevel];

    // Increase risk if sensitive data categories are selected
    const hasSensitiveData = selectedDataCategories.some((cat) =>
      ['Financial Data', 'Health Information', 'Business Confidential', 'Legal Documents'].includes(
        cat
      )
    );

    let finalScore = baseScore;
    if (hasSensitiveData && version.dataUsedForTraining) {
      finalScore = Math.min(baseScore + 1, 4);
    }

    return riskLevels[finalScore - 1];
  };

  const overallRisk = calculateOverallRisk();
  const riskConfig = riskLevelDescriptions[overallRisk];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Risk Assessment Tool</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Selection */}
        <div className="lg:col-span-2 space-y-8">
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-4">
              1. Select AI Provider
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {aiProviders.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProviderChange(p.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-center font-medium ${
                    selectedProviderId === p.id
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'
                  }`}
                >
                  <span className="text-xl mb-1 block">{p.logo}</span>
                  <span className="text-xs">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Version Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-4">
              2. Select Plan/Version
            </label>
            <div className="space-y-2">
              {provider?.versions.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVersionId(v.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedVersionId === v.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{v.name}</h4>
                      <p className="text-sm text-gray-600">{v.plan}</p>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: riskLevelDescriptions[v.riskLevel].bgColor,
                        color: riskLevelDescriptions[v.riskLevel].color,
                      }}
                    >
                      {riskLevelDescriptions[v.riskLevel].label}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Data Category Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-4">
              3. Select Data Types You Plan to Input
            </label>
            <div className="space-y-2">
              {dataCategories.map((cat) => (
                <label
                  key={cat.name}
                  className="flex items-start p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedDataCategories.includes(cat.name)}
                    onChange={() => handleDataCategoryToggle(cat.name)}
                    className="mt-1 mr-3 w-4 h-4 rounded border-gray-300"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{cat.name}</h4>
                    <p className="text-sm text-gray-600">{cat.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Examples: {cat.examples.join(', ')}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Result */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-lg border-2" style={{ borderColor: riskConfig.color }}>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Assessment Result</h3>

            {selectedDataCategories.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-600">
                  Select data types above to see your risk assessment
                </p>
              </div>
            ) : (
              <>
                <RiskMeter level={overallRisk} showLabel={true} size="lg" />

                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: riskConfig.bgColor }}>
                  <p className="text-sm" style={{ color: riskConfig.color }}>
                    <strong>Assessment:</strong> {riskConfig.description}
                  </p>
                </div>

                {version && (
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Data Training:</span>
                      <span className="font-medium">
                        {version.dataUsedForTraining ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Human Review:</span>
                      <span className="font-medium">{version.humanReview ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Encryption:</span>
                      <span className="font-medium text-xs text-right">
                        {version.encryption}
                      </span>
                    </div>
                  </div>
                )}

                {selectedDataCategories.some((cat) =>
                  ['Financial Data', 'Health Information', 'Business Confidential'].includes(cat)
                ) && version?.dataUsedForTraining && (
                  <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-800">
                      <strong>Warning:</strong> You are planning to input sensitive data into a service that uses data
                      for training. Consider using an enterprise plan instead.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
