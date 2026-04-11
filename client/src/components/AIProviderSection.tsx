import { AIProvider } from '@/lib/data/aiProvidersData';
import { AIVersionCard } from './AIVersionCard';

interface AIProviderSectionProps {
  provider: AIProvider;
}

export function AIProviderSection({ provider }: AIProviderSectionProps) {
  return (
    <section className="mb-12">
      {/* Provider Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{provider.logo}</span>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{provider.name}</h2>
            <p className="text-gray-600 mt-2">{provider.description}</p>
          </div>
        </div>
      </div>

      {/* Versions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {provider.versions.map((version) => (
          <AIVersionCard key={version.id} version={version} />
        ))}
      </div>
    </section>
  );
}
