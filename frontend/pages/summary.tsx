import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer
} from 'recharts';

export default function SummaryPage() {
  const [data, setData] = useState([]);
  const [wellDone, setWellDone] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/water-summary/demo-user')
      .then(res => {
        setData(res.data);
        const count = res.data.filter((d: any) => d.totalIntake >= 2000).length;
        setWellDone(count >= 5);
      });
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="main-nav">
        <Link href="/" legacyBehavior>
          <a className="main-nav-brand">💧 Water Intake Tracker</a>
        </Link>
        <div className="main-nav-links">
          <Link href="/" legacyBehavior><a>Home</a></Link>
          <Link href="/log" legacyBehavior><a>Log Intake</a></Link>
          <Link href="/summary" legacyBehavior><a className="active">Summary</a></Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="page-center-content">
        <div className="summary-card">
          <h1 className="summary-title">Weekly Water Intake Summary</h1>
          {/* Chart */}
          <div className="w-full mt-6 mb-2">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 3000]} />
                <Tooltip />
                <Bar dataKey="totalIntake" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                <ReferenceLine y={2000} label="Goal" stroke="#f87171" strokeDasharray="3 3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {wellDone && (
            <div className="mt-10 flex justify-center">
              <span className="px-10 py-5 rounded-full font-extrabold shadow-2xl animate-pulse text-2xl border-4 border-green-300 flex items-center gap-4 bg-gradient-to-r from-green-200 via-green-100 to-blue-100 text-green-900" style={{ marginTop: '1rem', padding: '15px' }}>
                <span className="text-3xl">🎉</span>
                <span>
                  Well done! <span className="text-green-700">5+ days</span> met your goal!
                </span>
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Global Footer */}
      <div className="app-footer">N</div>
    </>
  );
}
