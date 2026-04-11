import { riskProfiles } from '@/lib/data/riskProfilesData';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function CustomProfiles() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const profile = riskProfiles.find((p) => p.id === selectedProfile);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Custom Risk Assessment Profiles</h2>
        <p className="text-gray-600 mb-6">
          Select an industry profile to get tailored risk assessments and compliance recommendations specific to your organization's needs.
        </p>
      </div>

      {/* Dropdown Selector */}
      <div className="max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Your Industry Profile
        </label>
        <div className="relative">
          <select
            value={selectedProfile || ''}
            onChange={(e) => setSelectedProfile(e.target.value || null)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            <option value="">-- Choose an industry --</option>
            {riskProfiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.industry})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Profile Details */}
      {profile && (
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
            <p className="text-gray-600 mt-1">{profile.industry}</p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700">{profile.description}</p>
          </div>

          {/* Risk Tolerance */}
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-2 text-gray-900">Risk Tolerance</h4>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                profile.riskTolerance === 'low'
                  ? 'bg-green-100 text-green-800'
                  : profile.riskTolerance === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}
            >
              {profile.riskTolerance.charAt(0).toUpperCase() + profile.riskTolerance.slice(1)}
            </span>
          </div>

          {/* Data Types */}
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-2 text-gray-900">Sensitive Data Types</h4>
            <div className="flex flex-wrap gap-2">
              {profile.dataTypes.map((dataType) => (
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
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-2 text-gray-900">Applicable Compliance Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              {profile.complianceFrameworks.map((framework) => (
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
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-3 text-gray-900">Key Recommendations</h4>
            <ul className="space-y-2">
              {profile.recommendations.map((recommendation, index) => (
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
      {!profile && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-bold text-blue-900 mb-2">How to Use Profiles</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>1. Select a profile that matches your organization's industry from the dropdown above</li>
            <li>2. Review the recommended data types and compliance frameworks</li>
            <li>3. Apply the profile to customize your risk assessments</li>
            <li>4. Use the recommendations to guide your AI adoption strategy</li>
          </ul>
        </div>
      )}
    </div>
  );
}
