import { ComparisonTable } from '@/components/ComparisonTable';
import { MainNavigation } from '@/components/MainNavigation';
import { Link } from 'wouter';
import { ChevronLeft } from 'lucide-react';

export default function Comparison() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <MainNavigation />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ChevronLeft size={20} className="mr-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Compare AI Providers</h1>
          <p className="text-gray-600 mt-2">
            Side-by-side comparison of AI providers and their privacy policies
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <ComparisonTable />

        {/* Footer Info */}
        <section className="mt-16 p-8 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Comparison Notes</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Best Plan for Sensitive Data:</strong> The plan with the lowest risk rating
              for each provider.
            </li>
            <li>
              <strong>Data Used for Training:</strong> Whether the provider uses your data to train
              their models.
            </li>
            <li>
              <strong>Human Review:</strong> Whether humans may review your conversations.
            </li>
            <li>
              <strong>Encryption:</strong> The encryption standards used to protect your data.
            </li>
          </ul>
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
