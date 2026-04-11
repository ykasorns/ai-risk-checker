import { aiProviders, riskLevelDescriptions } from '@/lib/data/aiProvidersData';
import { useState } from 'react';

export function ComparisonTable() {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([
    aiProviders[0].id,
    aiProviders[1].id,
  ]);

  const handleProviderToggle = (providerId: string) => {
    setSelectedProviders((prev) =>
      prev.includes(providerId)
        ? prev.filter((id) => id !== providerId)
        : [...prev, providerId]
    );
  };

  const visibleProviders = aiProviders.filter((p) => selectedProviders.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Provider Selection */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-3">Select Providers to Compare</h3>
        <div className="flex flex-wrap gap-2">
          {aiProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleProviderToggle(provider.id)}
              className={`px-4 py-2 rounded-lg border-2 transition-all font-medium text-sm ${
                selectedProviders.includes(provider.id)
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'
              }`}
            >
              <span className="mr-2">{provider.logo}</span>
              {provider.name}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Criteria</th>
              {visibleProviders.map((provider) => (
                <th
                  key={provider.id}
                  className="px-4 py-3 text-center text-sm font-bold text-gray-900 min-w-[200px]"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">{provider.logo}</span>
                    <span>{provider.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Best Plan for Sensitive Data */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">Best Plan for Sensitive Data</td>
              {visibleProviders.map((provider) => {
                const bestPlan = provider.versions.find((v) => v.riskLevel === 'low');
                return (
                  <td key={provider.id} className="px-4 py-3 text-sm text-center text-gray-700">
                    {bestPlan ? bestPlan.name : 'N/A'}
                  </td>
                );
              })}
            </tr>

            {/* Lowest Risk Version */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">Lowest Risk Version</td>
              {visibleProviders.map((provider) => {
                const lowestRisk = provider.versions.reduce((prev, curr) =>
                  curr.riskLevel < prev.riskLevel ? curr : prev
                );
                const config = riskLevelDescriptions[lowestRisk.riskLevel];
                return (
                  <td key={provider.id} className="px-4 py-3 text-sm text-center">
                    <div
                      className="px-2 py-1 rounded inline-block text-sm font-medium"
                      style={{
                        backgroundColor: config.bgColor,
                        color: config.color,
                      }}
                    >
                      {config.label}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Data Used for Training */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">Data Used for Training (Best Plan)</td>
              {visibleProviders.map((provider) => {
                const bestPlan = provider.versions.find((v) => v.riskLevel === 'low');
                return (
                  <td key={provider.id} className="px-4 py-3 text-sm text-center text-gray-700">
                    {bestPlan ? (bestPlan.dataUsedForTraining ? 'Yes' : 'No') : 'N/A'}
                  </td>
                );
              })}
            </tr>

            {/* Human Review */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">Human Review (Best Plan)</td>
              {visibleProviders.map((provider) => {
                const bestPlan = provider.versions.find((v) => v.riskLevel === 'low');
                return (
                  <td key={provider.id} className="px-4 py-3 text-sm text-center text-gray-700">
                    {bestPlan ? (bestPlan.humanReview ? 'Yes' : 'No') : 'N/A'}
                  </td>
                );
              })}
            </tr>

            {/* Encryption */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">Encryption (Best Plan)</td>
              {visibleProviders.map((provider) => {
                const bestPlan = provider.versions.find((v) => v.riskLevel === 'low');
                return (
                  <td key={provider.id} className="px-4 py-3 text-sm text-center text-gray-700">
                    {bestPlan ? bestPlan.encryption : 'N/A'}
                  </td>
                );
              })}
            </tr>

            {/* Number of Versions */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">Number of Versions</td>
              {visibleProviders.map((provider) => (
                <td key={provider.id} className="px-4 py-3 text-sm text-center text-gray-700">
                  {provider.versions.length}
                </td>
              ))}
            </tr>

            {/* Enterprise Support */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">Enterprise Plan Available</td>
              {visibleProviders.map((provider) => {
                const hasEnterprise = provider.versions.some((v) => v.plan.includes('Enterprise'));
                return (
                  <td key={provider.id} className="px-4 py-3 text-sm text-center text-gray-700">
                    {hasEnterprise ? 'Yes' : 'No'}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
