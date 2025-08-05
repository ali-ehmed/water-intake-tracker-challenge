'use client';
import { useState } from 'react';
import api from '@/utils/api';

export default function WaterLogForm() {
  const [date, setDate] = useState('');
  const [intakeMl, setIntakeMl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/water-log', {
        date,
        intakeMl: parseInt(intakeMl, 10),
        userId: '1',
      });
      setMessage('Logged successfully!');
    } catch {
      setMessage('Failed to log water intake.');
    }
  };

  return (
    <main>
      <h1>Log Water Intake</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input
          type="number"
          value={intakeMl}
          onChange={(e) => setIntakeMl(e.target.value)}
          placeholder="Intake in ml"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
