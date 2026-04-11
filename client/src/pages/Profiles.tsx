import { MainNavigation } from '@/components/MainNavigation';
import { riskProfiles } from '@/lib/data/riskProfilesData';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Profiles() {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const selectedProfile = riskProfiles.find((p) => p.id === selectedProfileId);

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container py-8">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Custom Risk Assessment Profiles</h1>
            <p className="text-gray-600">
              Select an industry profile to get tailored risk assessments and compliance recommendations.
            </p>
          </div>

          {/* Dropdown Selector */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Industry Profile
            </label>
            <div className="relative max-w-md">
              <select
                value={selectedProfileId || ''}
                onChange={(e) => setSelectedProfileId(e.target.value || null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">-- Choose an industry --</option>
                {riskProfiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profile.name} ({profile.industry})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Profile Details */}
          {selectedProfile && (
            <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProfile.name}</h2>
                <p className="text-gray-600 mt-1">{selectedProfile.industry}</p>
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-700">{selectedProfile.description}</p>
              </div>

              {/* Risk Tolerance */}
              <div>
                <h3 className="font-semibold text-sm mb-2 text-gray-900">Risk Tolerance</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                    selectedProfile.riskTolerance === 'low'
                      ? 'bg-green-100 text-green-800'
                      : selectedProfile.riskTolerance === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedProfile.riskTolerance.charAt(0).toUpperCase() + selectedProfile.riskTolerance.slice(1)}
                </span>
              </div>

              {/* Data Types */}
              <div>
                <h3 className="font-semibold text-sm mb-2 text-gray-900">Sensitive Data Types</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.dataTypes.map((dataType) => (
                    <span
                      key={dataType}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium"
                    >
                      {dataType}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compliance Frameworks */}
              <div>
                <h3 className="font-semibold text-sm mb-2 text-gray-900">Applicable Compliance Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.complianceFrameworks.map((framework) => (
                    <span
                      key={framework}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium"
                    >
                      {framework}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold text-sm mb-3 text-gray-900">Key Recommendations</h3>
                <ul className="space-y-2">
                  {selectedProfile.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Apply This Profile
              </button>
            </div>
          )}

          {/* Info Box */}
          {!selectedProfile && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-2">How to Use Profiles</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>1. Select a profile that matches your organization's industry from the dropdown above</li>
                <li>2. Review the recommended data types and compliance frameworks</li>
                <li>3. Apply the profile to customize your risk assessments</li>
                <li>4. Use the recommendations to guide your AI adoption strategy</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
