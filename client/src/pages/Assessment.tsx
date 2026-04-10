import { RiskAssessmentTool } from '@/components/RiskAssessmentTool';
import { MainNavigation } from '@/components/MainNavigation';

export default function Assessment() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Risk Assessment Tool</h1>
            <p className="text-gray-600">
              Select an AI provider, plan, and the types of data you plan to input to see your risk assessment.
            </p>
          </div>

          <RiskAssessmentTool />
        </div>
      </div>
    </div>
  );
}
