'use client';
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

const GOAL = 2000;

export default function SummaryPage() {
  const [data, setData] = useState([]);
  const [wellDone, setWellDone] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/water-summary/1');
      const summary = response.data;

      setData(summary);

      // Check if 5+ days meet or exceed goal
      const daysMetGoal = summary.filter((entry: any) => entry.intakeMl >= GOAL).length;
      setWellDone(daysMetGoal >= 5);
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>Weekly Summary</h1>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <ReferenceLine y={GOAL} stroke="red" label="Goal" />
        <Bar dataKey="intakeMl" fill="#3182ce" />
      </BarChart>

      {wellDone && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '20px' }}>Well done! 🎉</p>}
    </main>
  );
}
