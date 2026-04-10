import { useState } from 'react';
import { ComplianceChecklist } from '@/components/ComplianceChecklist';
import { RiskMeter } from '@/components/RiskMeter';
import { MainNavigation } from '@/components/MainNavigation';

type RiskLevel = 'low' | 'medium' | 'high' | 'very-high';

const riskLevels: { value: RiskLevel; label: string; description: string }[] = [
  { value: 'low', label: 'Low Risk', description: 'Safe for sensitive data. Enterprise-grade security.' },
  { value: 'medium', label: 'Medium Risk', description: 'Moderate risk. User controls data usage.' },
  { value: 'high', label: 'High Risk', description: 'High risk for sensitive data. Avoid personal/financial information.' },
  { value: 'very-high', label: 'Very High Risk', description: 'Very high risk. Human review possible. Only use for public information.' },
];

export default function Checklist() {
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel>('high');

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Compliance Audit Checklist</h1>
            <p className="text-gray-600 mb-8">
              Use this checklist to audit your AI usage against GDPR and PDPA compliance requirements. Select a risk level to see the relevant checklist items.
            </p>

            {/* Risk Level Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {riskLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSelectedRisk(level.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedRisk === level.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{level.label}</h3>
                    <RiskMeter level={level.value} size="sm" />
                  </div>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <ComplianceChecklist riskLevel={selectedRisk} />
          </div>
        </div>
      </div>
    </div>
  );
}
