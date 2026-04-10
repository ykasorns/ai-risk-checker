import { RiskAssessmentTool } from '@/components/RiskAssessmentTool';
import { MainNavigation } from '@/components/MainNavigation';
import { riskLevelDescriptions } from '@/lib/aiProvidersData';


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <MainNavigation />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">AI Risk Checker</h1>
          <p className="text-gray-600 mt-2">
            Assess the risks of using AI models based on official provider data
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Risk Scale Legend */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Risk Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(riskLevelDescriptions).map(([level, config]) => (
              <div
                key={level}
                className="p-4 rounded-lg border-2"
                style={{
                  backgroundColor: config.bgColor,
                  borderColor: config.color,
                }}
              >
                <h3 className="font-bold mb-2" style={{ color: config.color }}>
                  {config.label}
                </h3>
                <p className="text-sm text-gray-700">{config.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-gray-200 my-12" />

        {/* Risk Assessment Tool */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Risk Assessment Tool</h2>
          <RiskAssessmentTool />
        </section>

        {/* Divider */}
        <div className="border-t-2 border-gray-200 my-12" />

        {/* Footer Info - About This Assessment */}
        <section className="mt-16 p-8 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">About This Assessment</h3>
          <p className="text-gray-700 mb-4">
            This website provides risk assessments based on official documentation from AI providers. The information is
            current as of January 2026 and reflects each provider's stated privacy policies and data handling practices.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Important:</strong> This assessment is for informational purposes only. Always review the official
            terms of service and privacy policies of each AI provider before using their services. Data practices may
            change, and different regions may have different policies.
          </p>
          <p className="text-gray-600 text-sm">
            For the most current information, visit the official documentation links provided for each AI provider.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>AI Risk Checker - Based on official provider documentation</p>
          <p className="mt-2 text-gray-500">
            Data sources: OpenAI, Google, Anthropic, Microsoft official documentation
          </p>
        </div>
      </footer>
    </div>
  );
}
