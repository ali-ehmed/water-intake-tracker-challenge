'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WaterForm() {
  const [date, setDate] = useState('');
  const [intake, setIntake] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'validation'>('idle');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const submit = async () => {
    setStatus('idle');
    setMessage('');

    if (!date || !intake) {
      setStatus('validation');
      setMessage('Please fill out both the date and water intake amount.');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/water-log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '12', // hard coded for testing.
          date,
          intakeMl: Number(intake),
        }),
      });

      if (!res.ok) throw new Error();

      setStatus('success');
      setMessage('✅ Water intake logged successfully!');
      setDate('');
      setIntake('');
    } catch {
      setStatus('error');
      setMessage('❌ Failed to log water intake. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="number"
        placeholder="Enter water intake in ml"
        value={intake}
        onChange={e => setIntake(e.target.value)}
        className="border p-2 w-full rounded"
        required
        max={2000}
      />

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={submit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <button
          onClick={() => router.push('/summary')}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          View Summary
        </button>
      </div>

      {/* Message */}
      {status !== 'idle' && (
        <p
          className={`mt-2 text-sm ${
            status === 'success'
              ? 'text-green-600'
              : status === 'error'
              ? 'text-red-600'
              : 'text-yellow-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
