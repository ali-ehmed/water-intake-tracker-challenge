'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WaterSummaryChart from '@/components/WaterSummaryChart';
import { api, WaterSummaryItem } from '@/services/api';

export default function SummaryPage() {
  const [userId, setUserId] = useState('user-1');
  const [data, setData] = useState<WaterSummaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    setLoading(true);
    setError('');
    
    try {
      const summaryData = await api.getWeeklySummary(userId);
      setData(summaryData);
    } catch (err) {
      setError('Failed to load summary data. Please try again.');
      console.error('Error fetching summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Weekly Water Intake Summary</h1>
          <p className="text-gray-600">View your hydration progress over the last 7 days</p>
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

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading summary data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <WaterSummaryChart data={data} />
        )}

        <div className="mt-8 text-center">
          <Link 
            href="/log" 
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            ← Log Water Intake
          </Link>
        </div>
      </div>
    </div>
  );
} 