import React, { useState } from 'react';
import './log.css';

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
    <form onSubmit={handleSubmit} className="log-form">
      <div>
        <label className="log-label">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          className="log-input"
          required
        />
      </div>
      <div>
        <label className="log-label">Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="log-input"
          required
        />
      </div>
      <div>
        <label className="log-label">Intake (ml)</label>
        <input
          type="number"
          min="0"
          value={intakeMl}
          onChange={e => setIntakeMl(e.target.value)}
          className="log-input"
          required
        />
      </div>
      {error && <div className="log-error">{error}</div>}
      <button
        type="submit"
        className="log-btn"
        disabled={loading}
      >
        {loading ? 'Logging...' : 'Log Water Intake'}
      </button>
    </form>
  );
}
