import { complianceData, riskComplianceMapping, RiskLevel } from '@/lib/data/complianceData';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ComplianceRecommendationsProps {
  riskLevel: RiskLevel;
}

export function ComplianceRecommendations({ riskLevel }: ComplianceRecommendationsProps) {
  const [expandedFramework, setExpandedFramework] = useState<string | null>('GDPR');

  const mapping = riskComplianceMapping[riskLevel];

  return (
    <div className="mt-8 space-y-4">
      <h4 className="text-lg font-bold text-gray-900">Compliance & Recommendations</h4>

      {/* GDPR Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedFramework(expandedFramework === 'GDPR' ? null : 'GDPR')}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">🇪🇺 GDPR</span>
            <span className={`text-sm font-medium ${mapping.gdprColor}`}>{mapping.gdprStatus}</span>
          </div>
          <ChevronDown
            size={20}
            className={`text-gray-600 transition-transform ${expandedFramework === 'GDPR' ? 'rotate-180' : ''}`}
          />
        </button>

        {expandedFramework === 'GDPR' && (
          <div className="px-4 py-4 space-y-4 bg-white border-t border-gray-200">
            <p className="text-sm text-gray-700">{complianceData.GDPR.description}</p>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Key Requirements:</h5>
              <ul className="space-y-1 text-sm text-gray-700">
                {complianceData.GDPR.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-gray-400">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Recommendations for this Risk Level:</h5>
              <ul className="space-y-1 text-sm text-gray-700">
                {complianceData.GDPR.recommendations[riskLevel]?.map((rec: string, idx: number) => (
                  <li key={idx} className="flex gap-2">
                    <span className="flex-shrink-0">{rec.substring(0, 2)}</span>
                    <span>{rec.substring(2).trim()}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <a
                href="https://gdpr-info.eu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                → Learn more about GDPR
              </a>
            </div>
          </div>
        )}
      </div>

      {/* PDPA Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedFramework(expandedFramework === 'PDPA' ? null : 'PDPA')}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">🇹🇭 PDPA</span>
            <span className={`text-sm font-medium ${mapping.pdpaColor}`}>{mapping.pdpaStatus}</span>
          </div>
          <ChevronDown
            size={20}
            className={`text-gray-600 transition-transform ${expandedFramework === 'PDPA' ? 'rotate-180' : ''}`}
          />
        </button>

        {expandedFramework === 'PDPA' && (
          <div className="px-4 py-4 space-y-4 bg-white border-t border-gray-200">
            <p className="text-sm text-gray-700">{complianceData.PDPA.description}</p>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Key Requirements:</h5>
              <ul className="space-y-1 text-sm text-gray-700">
                {complianceData.PDPA.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-gray-400">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Recommendations for this Risk Level:</h5>
              <ul className="space-y-1 text-sm text-gray-700">
                {complianceData.PDPA.recommendations[riskLevel]?.map((rec: string, idx: number) => (
                  <li key={idx} className="flex gap-2">
                    <span className="flex-shrink-0">{rec.substring(0, 2)}</span>
                    <span>{rec.substring(2).trim()}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <a
                href="https://www.pdpc.gov.th/th/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                → Learn more about PDPA
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
