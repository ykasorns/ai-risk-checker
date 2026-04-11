import { providerHistory } from '@/lib/data/providerHistoryData';
import { AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useState } from 'react';

export function ProviderHistory() {
  const [selectedProvider, setSelectedProvider] = useState(providerHistory[0].provider);

  const provider = providerHistory.find((p) => p.provider === selectedProvider);

  if (!provider) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">AI Provider History Tracking</h2>
        <p className="text-gray-600 mb-6">
          Track policy changes and updates from AI providers to stay informed about privacy and compliance changes.
        </p>
      </div>

      {/* Provider Selection */}
      <div className="flex flex-wrap gap-2">
        {providerHistory.map((p) => (
          <button
            key={p.provider}
            onClick={() => setSelectedProvider(p.provider)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedProvider === p.provider
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {p.provider}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {provider.changes.map((change, index) => (
          <div key={index} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
            {/* Timeline Dot and Line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  change.impact === 'positive'
                    ? 'bg-green-100'
                    : change.impact === 'negative'
                      ? 'bg-red-100'
                      : 'bg-gray-100'
                }`}
              >
                {change.impact === 'positive' ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : change.impact === 'negative' ? (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                ) : (
                  <Minus className="w-5 h-5 text-gray-600" />
                )}
              </div>
              {index < provider.changes.length - 1 && (
                <div className="w-0.5 h-12 bg-gray-300 my-2"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{change.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {change.date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    change.impact === 'positive'
                      ? 'bg-green-100 text-green-800'
                      : change.impact === 'negative'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {change.impact === 'positive' ? '✓ Positive' : change.impact === 'negative' ? '✗ Negative' : '○ Neutral'}
                </span>
              </div>

              <p className="text-gray-700 mt-3">{change.description}</p>

              {/* Affected Plans */}
              <div className="mt-3 flex flex-wrap gap-2">
                {change.affectedPlans.map((plan) => (
                  <span
                    key={plan}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded font-medium"
                  >
                    {plan}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-blue-900">Policy Change Summary</h4>
            <p className="text-sm text-blue-800 mt-1">
              {provider.provider} has made {provider.changes.length} policy changes in the past 5 months.
              {provider.changes.filter((c) => c.impact === 'positive').length > 0 && (
                <>
                  {' '}
                  <span className="font-medium">
                    {provider.changes.filter((c) => c.impact === 'positive').length} positive
                  </span>{' '}
                  changes
                </>
              )}
              {provider.changes.filter((c) => c.impact === 'negative').length > 0 && (
                <>
                  {' '}
                  and{' '}
                  <span className="font-medium">
                    {provider.changes.filter((c) => c.impact === 'negative').length} negative
                  </span>{' '}
                  changes
                </>
              )}
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
