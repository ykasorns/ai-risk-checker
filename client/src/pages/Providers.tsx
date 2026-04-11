import { AIProviderSection } from '@/components/AIProviderSection';
import { aiProviders } from '@/lib/data/aiProvidersData';
import { MainNavigation } from '@/components/MainNavigation';

export default function Providers() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Providers & Versions</h1>
            <p className="text-gray-600">
              Explore different AI providers and their versions to understand the privacy and security implications of each.
            </p>
          </div>

          <div className="space-y-12">
            {aiProviders.map((provider) => (
              <AIProviderSection key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
