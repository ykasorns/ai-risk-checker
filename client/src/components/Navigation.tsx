import { Link, useLocation } from 'wouter';

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
          AI Risk Checker
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`font-medium transition-colors ${
              location === '/'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Home
          </Link>
          <Link
            href="/comparison"
            className={`font-medium transition-colors ${
              location === '/comparison'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Compare
          </Link>
        </div>
      </div>
    </nav>
  );
}
