import { MainNavigation } from '@/components/MainNavigation';
import { ExportPDF } from '@/components/ExportPDF';
import { toast } from 'sonner';

export default function Export() {
  const handleExport = () => {
    toast.success('Report exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container py-8">
        <div className="max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Export Compliance Report</h1>
            <p className="text-gray-600">
              Generate and export comprehensive compliance reports for management review and archival.
            </p>
          </div>

          <ExportPDF onExport={handleExport} />

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">📊 Dashboard Summary</h3>
              <p className="text-sm text-gray-600">
                Overview of your AI usage, risk distribution, and compliance scores.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">🔍 Risk Assessment</h3>
              <p className="text-sm text-gray-600">
                Detailed analysis of each AI provider and their risk levels.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">✅ Compliance Checklist</h3>
              <p className="text-sm text-gray-600">
                Audit checklist for verifying compliance with regulations.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">📈 Provider History</h3>
              <p className="text-sm text-gray-600">
                Timeline of policy changes and updates from AI providers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
