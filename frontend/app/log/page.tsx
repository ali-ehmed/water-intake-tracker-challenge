'use client';
import React, { useState } from 'react';
import LogForm from './LogForm';

const WaterDrop = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto mb-2 drop-shadow-lg">
    <defs>
      <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA"/>
        <stop offset="100%" stopColor="#3B82F6"/>
      </linearGradient>
    </defs>
    <path d="M16 3C16 3 6.67 15.5 6.67 23C6.67 29 12 32 16 32C20 32 25.33 29 25.33 23C25.33 15.5 16 3 16 3Z" fill="url(#waterGradient)" stroke="#2563EB" strokeWidth="1.5"/>
    <ellipse cx="16" cy="25.5" rx="4.5" ry="2.5" fill="#DBEAFE" />
  </svg>
);

export default function LogPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLog = async (data: { userId: string; date: string; intakeMl: number }) => {
    setLoading(true);
    setSuccess(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/water-log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to log water intake');
      setSuccess('Water intake logged successfully!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log-bg">
      <div className="log-card">
        <WaterDrop />
        <h1 className="log-title">Log Water Intake</h1>
        <p className="log-subtitle">Stay hydrated! Track your daily water intake below.</p>
        <LogForm onSubmit={handleLog} loading={loading} />
        {success && (
          <div style={{ marginTop: 18, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <span style={{ background: '#d1fae5', color: '#065f46', borderRadius: 999, padding: '8px 20px', fontWeight: 600, boxShadow: '0 2px 8px #34d39944', display: 'inline-flex', alignItems: 'center', gap: 8, animation: 'bounce 1s infinite alternate' }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#34D399"/><path d="M7 13.5l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {success}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
