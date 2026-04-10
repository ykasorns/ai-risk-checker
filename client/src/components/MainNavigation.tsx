import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NotificationCenter } from './NotificationCenter';

export function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Risk Assessment', path: '/assessment' },
    { label: 'AI Providers', path: '/providers' },
    { label: 'Compliance Checklist', path: '/checklist' },
    { label: 'Risk Calculator', path: '/calculator' },
    { label: 'Report Generator', path: '/report' },
    { label: 'Compare', path: '/comparison' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'History', path: '/history' },
    { label: 'Profiles', path: '/profiles' },
    { label: 'Export', path: '/export' },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:text-gray-300 transition-colors">
            <span className="text-2xl">🤖</span>
            <span>AI Risk Checker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded transition-colors text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Notification Center */}
          <div className="hidden md:block">
            <NotificationCenter />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-800 rounded transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded transition-colors text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
