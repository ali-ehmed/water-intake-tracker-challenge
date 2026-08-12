'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Droplets, BarChart3 } from 'lucide-react';

const navigation = [
  { name: 'Log Water', href: '/log', icon: Droplets },
  { name: 'Summary', href: '/summary', icon: BarChart3 },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="ml-1 sm:ml-2 text-lg sm:text-xl font-bold text-gray-900">
                Water Tracker
              </span>
              <span className="ml-1 text-lg sm:text-xl">💧</span>
            </div>
            <div className="ml-3 sm:ml-6 flex space-x-2 sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center px-1 sm:px-1 pt-1 border-b-2 text-xs sm:text-sm font-medium whitespace-nowrap',
                      pathname === item.href
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 