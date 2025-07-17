'use client';
import React, { useState } from 'react';
import './summary.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts';

export default function SummaryPage() {
  React.useEffect(() => {
    document.title = 'Water Intake Tracker 💧';
  }, []);
  const [userId, setUserId] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wellDone, setWellDone] = useState(false);

  // ---
  // The following logic (fetching, aligning, and merging summary data for the last 7 days)
  // was generated with the help of GPT (AI assistant)
  // ---
  const fetchData = async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/water-summary/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch summary');
      const result = await res.json();
      // Always use today as the end of the 7-day window
      const today = new Date();
      const days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (6 - i));
        return d.toISOString().slice(0, 10);
      });
      // Map backend data by date
      const map = Object.fromEntries(result.map((d: any) => [d.date, d]));
      // Merge: always 7 days, fill missing with 0
      const merged = days.map(date => ({
        date,
        totalIntake: map[date]?.totalIntake ?? 0,
        percentageOfGoal: map[date]?.percentageOfGoal ?? 0,
      }));
      setData(merged);
      // Bonus: show "Well done!" if 5+ of 7 days meet/exceed goal
      const count = result.filter((d: any) => d.totalIntake >= 2000).length;
      setWellDone(count >= 5);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="summary-bg">
      <div className="summary-card">
        <svg style={{ position: 'absolute', top: -24, right: 24, opacity: 0.18 }} width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 4C24 4 10 20.5 10 30C10 38 16.5 44 24 44C31.5 44 38 38 38 30C38 20.5 24 4 24 4Z" fill="#60A5FA" stroke="#2563EB" strokeWidth="2"/>
        </svg>
        <h1 className="summary-title">Weekly Water Intake Summary</h1>
        <p className="summary-subtitle">Enter your User ID to view your last 7 days of water intake.</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (userId) fetchData();
          }}
          className="summary-form"
        >
          <label htmlFor="userId" className="summary-label" style={{ position: 'absolute', left: '-9999px' }}>User ID</label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={e => {
              setUserId(e.target.value);
              setData([]);
              setWellDone(false);
              setError(null);
            }}
            placeholder="User ID"
            className="summary-input"
            required
          />
          <button
            type="submit"
            className="summary-btn"
            disabled={loading || !userId}
          >
            {loading ? 'Loading...' : 'Fetch Summary'}
          </button>
        </form>
        {error && <div className="summary-error">{error}</div>}
        {wellDone && (
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center px-5 py-3 bg-green-100 text-green-800 rounded-full shadow font-semibold animate-bounce gap-2">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#34D399"/><path d="M7 13.5l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Well done!
            </span>
          </div>
        )}
        {error && <div className="mb-4 text-red-700 text-center font-medium">{error}</div>}
        <div className="mt-8 px-2" style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis 
                dataKey="date"
                tickFormatter={d => {
                  const dt = new Date(d);
                  return dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                }}
                fontSize={14}
                tick={{ fill: '#63b3ed', fontWeight: 700 }}
                interval={0}
              />
              <YAxis domain={[0, 3000]} tick={{ fontSize: 14, fill: '#63b3ed', fontWeight: 700 }} label={{ value: 'ml', angle: -90, position: 'insideLeft', offset: 12, fontWeight: 700, fill: '#63b3ed' }} axisLine={{ stroke: '#4A5568' }} />
              <Tooltip contentStyle={{ background: '#2D3748', color: '#fff', border: 'none' }} formatter={(v: number) => `${v} ml`} labelFormatter={l => `Date: ${l}`} />
              <ReferenceLine y={2000} stroke="#e53e3e" strokeDasharray="3 3" label={{ value: 'Goal', position: 'top', fill: '#e53e3e', fontWeight: 700, fontSize: 16 }} />
              <Bar dataKey="totalIntake" fill="#4299e1" radius={[8, 8, 0, 0]}>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
