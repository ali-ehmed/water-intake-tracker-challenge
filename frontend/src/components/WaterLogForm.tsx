'use client';

import { useState } from 'react';
import { api, WaterLogRequest } from '@/services/api';

interface WaterLogFormProps {
  userId: string;
  onSuccess?: () => void;
}

export default function WaterLogForm({ userId, onSuccess }: WaterLogFormProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [intakeMl, setIntakeMl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const data: WaterLogRequest = {
        userId,
        date,
        intakeMl: parseInt(intakeMl),
      };

      await api.logWaterIntake(data);
      setMessage('Water intake logged successfully! 💧');
      setIntakeMl('');
      onSuccess?.();
    } catch (error) {
      setMessage('Failed to log water intake. Please try again.');
      console.error('Error logging water intake:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Log Water Intake</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            required
          />
        </div>

        <div>
          <label htmlFor="intakeMl" className="block text-sm font-medium text-gray-700 mb-1">
            Water Intake (ml)
          </label>
          <input
            type="number"
            id="intakeMl"
            value={intakeMl}
            onChange={(e) => setIntakeMl(e.target.value)}
            placeholder="e.g., 1500"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Logging...' : 'Log Intake'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-md ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
} 