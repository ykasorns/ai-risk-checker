import { MainNavigation } from '@/components/MainNavigation';
import { ProviderHistory } from '@/components/ProviderHistory';

export default function History() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container py-8">
        <ProviderHistory />
      </div>
    </div>
  );
}
