import { aiProviders, PolicyCategory } from '@/lib/data/aiProvidersData';
import { MainNavigation } from '@/components/MainNavigation';
import { ExternalLink, Shield, FileText, Building2, Lock, CheckSquare } from 'lucide-react';
import { useState } from 'react';

const categoryConfig: Record<PolicyCategory, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  privacy: { label: 'Privacy Policy', icon: Shield, color: 'text-blue-700', bg: 'bg-blue-100' },
  terms: { label: 'Terms of Service', icon: FileText, color: 'text-purple-700', bg: 'bg-purple-100' },
  enterprise: { label: 'Enterprise', icon: Building2, color: 'text-green-700', bg: 'bg-green-100' },
  security: { label: 'Security', icon: Lock, color: 'text-orange-700', bg: 'bg-orange-100' },
  compliance: { label: 'Compliance', icon: CheckSquare, color: 'text-gray-700', bg: 'bg-gray-100' },
};

const ALL_CATEGORIES: PolicyCategory[] = ['privacy', 'terms', 'enterprise', 'security', 'compliance'];

export default function PolicySources() {
  const [activeCategory, setActiveCategory] = useState<PolicyCategory | 'all'>('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Official Policy Sources</h1>
          <p className="text-gray-600 max-w-2xl">
            Direct links to official documentation from each AI provider. Always verify the latest policies before using
            AI services with sensitive data.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Sources
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const cfg = categoryConfig[cat];
            const Icon = cfg.icon;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={14} />
                {cfg.label}
              </button>
            );
          })}
        </div>

        {/* Provider Sections */}
        <div className="space-y-10">
          {aiProviders.map((provider) => {
            const filtered = provider.policyLinks.filter(
              (link) => activeCategory === 'all' || link.category === activeCategory
            );
            if (filtered.length === 0) return null;

            return (
              <div key={provider.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                {/* Provider Header */}
                <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-200 bg-gray-50">
                  <span className="text-4xl">{provider.logo}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{provider.name}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{filtered.length} source{filtered.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  {filtered.map((link) => {
                    const cfg = categoryConfig[link.category];
                    const Icon = cfg.icon;
                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 px-6 py-5 hover:bg-blue-50 transition-colors group border-b border-gray-100 last:border-b-0"
                      >
                        <div className={`flex-shrink-0 p-2 rounded-lg ${cfg.bg}`}>
                          <Icon size={18} className={cfg.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                              {link.title}
                            </span>
                            <ExternalLink size={14} className="flex-shrink-0 text-gray-400 group-hover:text-blue-600 mt-0.5 transition-colors" />
                          </div>
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{link.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                              {cfg.label}
                            </span>
                            <span className="text-xs text-gray-400">
                              Checked: {link.lastChecked}
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl">
          <h3 className="font-bold text-amber-900 mb-2">Important Notice</h3>
          <p className="text-sm text-amber-800">
            AI provider policies change frequently. The links above point directly to official sources — always read
            the current version before making decisions. The "Last Checked" dates reflect when our data was last
            verified, not when the provider last updated their policy.
          </p>
        </div>
      </div>
    </div>
  );
}
