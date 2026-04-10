import { useState } from 'react';
import { RiskMeter } from '@/components/RiskMeter';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { MainNavigation } from '@/components/MainNavigation';

type RiskLevel = 'low' | 'medium' | 'high' | 'very-high';

interface CalculatorState {
  numUsers: number;
  dataTypes: string[];
  usageDuration: string;
  usageFrequency: string;
}

const dataTypeOptions = [
  { id: 'personal', label: 'Personal Information', weight: 3 },
  { id: 'financial', label: 'Financial Data', weight: 4 },
  { id: 'health', label: 'Health Information', weight: 4 },
  { id: 'business', label: 'Business Confidential', weight: 3 },
  { id: 'legal', label: 'Legal Documents', weight: 3 },
  { id: 'public', label: 'Public Information', weight: 1 },
];

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    numUsers: 1,
    dataTypes: [],
    usageDuration: 'short',
    usageFrequency: 'occasional',
  });
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<RiskLevel | null>(null);

  const calculateRisk = () => {
    if (state.dataTypes.length === 0) {
      alert('Please select at least one data type');
      return;
    }

    // Calculate base score from data types
    const baseScore = state.dataTypes.reduce((sum, typeId) => {
      const type = dataTypeOptions.find((t) => t.id === typeId);
      return sum + (type?.weight || 0);
    }, 0);

    // Adjust for number of users
    const userMultiplier = Math.min(state.numUsers / 100, 2);

    // Adjust for usage duration
    const durationMultiplier =
      state.usageDuration === 'short' ? 1 : state.usageDuration === 'medium' ? 1.5 : 2;

    // Adjust for usage frequency
    const frequencyMultiplier =
      state.usageFrequency === 'occasional' ? 1 : state.usageFrequency === 'regular' ? 1.5 : 2;

    // Final score (0-100)
    const finalScore = Math.min(
      Math.round(baseScore * userMultiplier * durationMultiplier * frequencyMultiplier),
      100
    );

    setRiskScore(finalScore);

    // Determine risk level
    if (finalScore <= 25) {
      setRiskLevel('low');
    } else if (finalScore <= 50) {
      setRiskLevel('medium');
    } else if (finalScore <= 75) {
      setRiskLevel('high');
    } else {
      setRiskLevel('very-high');
    }
  };

  const handleDataTypeChange = (typeId: string) => {
    setState((prev) => ({
      ...prev,
      dataTypes: prev.dataTypes.includes(typeId)
        ? prev.dataTypes.filter((t) => t !== typeId)
        : [...prev.dataTypes, typeId],
    }));
  };

  const exportResult = () => {
    const result = `AI Risk Score Calculator Result\n\nRisk Score: ${riskScore}/100\nRisk Level: ${riskLevel}\n\nData Types: ${state.dataTypes.join(', ')}\nNumber of Users: ${state.numUsers}\nUsage Duration: ${state.usageDuration}\nUsage Frequency: ${state.usageFrequency}`;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'risk-score.txt';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Risk Score Calculator</h1>
            <p className="text-gray-600">
              Calculate your overall AI risk score based on your usage patterns and data types.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-8 space-y-6">
              {/* Number of Users */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Number of Users
                </label>
                <input
                  type="number"
                  min="1"
                  value={state.numUsers}
                  onChange={(e) => setState({ ...state, numUsers: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-xs text-gray-500 mt-1">How many people will use this AI service?</p>
              </div>

              {/* Data Types */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Data Types You Plan to Input
                </label>
                <div className="space-y-2">
                  {dataTypeOptions.map((type) => (
                    <label key={type.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={state.dataTypes.includes(type.id)}
                        onChange={() => handleDataTypeChange(type.id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Usage Duration */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Usage Duration
                </label>
                <select
                  value={state.usageDuration}
                  onChange={(e) => setState({ ...state, usageDuration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="short">Short-term (less than 1 month)</option>
                  <option value="medium">Medium-term (1-6 months)</option>
                  <option value="long">Long-term (more than 6 months)</option>
                </select>
              </div>

              {/* Usage Frequency */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Usage Frequency
                </label>
                <select
                  value={state.usageFrequency}
                  onChange={(e) => setState({ ...state, usageFrequency: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="occasional">Occasional (few times a week)</option>
                  <option value="regular">Regular (daily)</option>
                  <option value="frequent">Frequent (multiple times daily)</option>
                </select>
              </div>

              <Button onClick={calculateRisk} className="w-full bg-blue-600 hover:bg-blue-700">
                Calculate Risk Score
              </Button>
            </div>

            {/* Results */}
            <div className="lg:col-span-1">
              {riskScore !== null && riskLevel ? (
                <div className="bg-white rounded-lg shadow-md p-8 space-y-6 sticky top-24">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Your Risk Score</h3>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{riskScore}</div>
                      <div className="text-sm text-gray-600 mb-4">/100</div>
                      <RiskMeter level={riskLevel} size="md" />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-sm text-gray-600 mb-4">
                      {riskLevel === 'low' &&
                        'Your risk score is low. This AI usage is relatively safe for the data types you selected.'}
                      {riskLevel === 'medium' &&
                        'Your risk score is moderate. Consider implementing additional safeguards.'}
                      {riskLevel === 'high' &&
                        'Your risk score is high. We recommend reviewing your data usage and compliance measures.'}
                      {riskLevel === 'very-high' &&
                        'Your risk score is very high. Immediate action is recommended to mitigate risks.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={exportResult}
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
                      Export Result
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Share2 size={18} />
                      Share
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <p className="text-gray-600">Fill in the form and click "Calculate Risk Score" to see your results.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
