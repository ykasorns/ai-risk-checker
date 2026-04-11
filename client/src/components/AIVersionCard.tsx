import { AIVersion, riskLevelDescriptions } from '@/lib/data/aiProvidersData';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { RiskMeter } from './RiskMeter';
import { ComplianceRecommendations } from './ComplianceRecommendations';
import { ComplianceChecklist } from './ComplianceChecklist';

interface AIVersionCardProps {
  version: AIVersion;
}

export function AIVersionCard({ version }: AIVersionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const config = riskLevelDescriptions[version.riskLevel];

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{version.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{version.plan}</p>
          </div>
          <div
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: config.bgColor,
              color: config.color,
            }}
          >
            {config.label}
          </div>
        </div>

        {/* Risk Meter */}
        <RiskMeter level={version.riskLevel} size="md" />
      </div>

      {/* Quick Info */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <p className="text-sm text-gray-700">{version.description}</p>
      </div>

      {/* Details */}
      <div className="px-6 py-4 space-y-3">
        <div className="flex items-start justify-between text-sm">
          <span className="text-gray-600 font-medium">Data for Training:</span>
          <span className="text-gray-900">{version.dataUsedForTraining ? 'Yes' : 'No'}</span>
        </div>
        <div className="flex items-start justify-between text-sm">
          <span className="text-gray-600 font-medium">Data Retention:</span>
          <span className="text-gray-900">{version.dataRetention}</span>
        </div>
        <div className="flex items-start justify-between text-sm">
          <span className="text-gray-600 font-medium">Human Review:</span>
          <span className="text-gray-900">{version.humanReview ? 'Yes' : 'No'}</span>
        </div>
        <div className="flex items-start justify-between text-sm">
          <span className="text-gray-600 font-medium">Encryption:</span>
          <span className="text-gray-900">{version.encryption}</span>
        </div>
      </div>

      {/* Official Source Link - always visible */}
      <div className="px-6 py-3 border-t border-gray-100">
        <a
          href={version.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <ExternalLink size={13} />
          Official documentation
        </a>
      </div>

      {/* Expandable Section */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-3 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50 border-t border-gray-200 transition-colors"
      >
        <span>Recommendations & Compliance</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 space-y-6">
          {/* Recommendations */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">Recommendations</h4>
            <ul className="space-y-2">
              {version.recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2 flex-shrink-0">{rec.charAt(0)}</span>
                  <span>{rec.substring(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Recommendations */}
          <div className="border-t border-gray-300 pt-4">
            <ComplianceRecommendations riskLevel={version.riskLevel} />
          </div>

          {/* Compliance Checklist for Auditors */}
          <div className="border-t border-gray-300 pt-4">
            <button
              onClick={() => setShowChecklist(!showChecklist)}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 mb-4"
            >
              {showChecklist ? '▼ Hide' : '▶ Show'} Compliance Checklist for Auditors
            </button>
            {showChecklist && (
              <div className="mt-4 bg-white p-4 rounded border border-gray-200">
                <ComplianceChecklist riskLevel={version.riskLevel} />
              </div>
            )}
          </div>

          {/* Compliance Standards */}
          <div className="border-t border-gray-300 pt-4">
            <h4 className="text-sm font-bold text-gray-900 mb-2">Compliance Standards</h4>
            <div className="flex flex-wrap gap-2">
              {version.compliance.map((comp, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Source */}
          <div className="border-t border-gray-300 pt-4">
            <a
              href={version.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              View official documentation
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
