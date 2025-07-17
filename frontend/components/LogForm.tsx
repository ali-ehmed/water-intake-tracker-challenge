// 'use client';
import React, { useState } from 'react';

interface LogFormProps {
  onSubmit: (data: { userId: string; date: string; intakeMl: number }) => Promise<void>;
  loading: boolean;
}

export default function LogForm({ onSubmit, loading }: LogFormProps) {
  const [date, setDate] = useState('');
  const [intakeMl, setIntakeMl] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!userId || !date || !intakeMl) {
      setError('All fields are required.');
      return;
    }
    try {
      await onSubmit({ userId, date, intakeMl: Number(intakeMl) });
      setDate('');
      setIntakeMl('');
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Intake (ml)</label>
          <input
            type="number"
            min="0"
            value={intakeMl}
            onChange={e => setIntakeMl(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
      </div>
      {error && <div className="text-red-600 font-medium text-sm mt-2">{error}</div>}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
        disabled={loading}
      >
        {loading ? 'Logging...' : 'Log Water Intake'}
      </button>
    </form>
  );
}
