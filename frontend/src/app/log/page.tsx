'use client';

import { useState } from 'react';
import Link from 'next/link';
import WaterLogForm from '@/components/WaterLogForm';

export default function LogPage() {
  const [userId, setUserId] = useState('user-1'); // Default user ID for demo

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Water Intake Tracker</h1>
          <p className="text-gray-600">Track your daily water consumption</p>
        </div>

        <div className="mb-6">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
            User ID (for demo purposes)
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            placeholder="Enter user ID"
          />
        </div>

        <WaterLogForm userId={userId} />

        <div className="mt-8 text-center">
          <Link 
            href="/summary" 
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            View Weekly Summary →
          </Link>
        </div>
      </div>
    </div>
  );
} 