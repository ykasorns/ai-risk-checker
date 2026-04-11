import { MainNavigation } from '@/components/MainNavigation';
import { CustomProfiles } from '@/components/CustomProfiles';

export default function Profiles() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container py-8">
        <div className="max-w-4xl">
          <CustomProfiles />
        </div>
      </div>
    </div>
  );
}
