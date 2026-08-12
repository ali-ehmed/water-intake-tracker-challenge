'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { WaterSummaryResponse } from '@/types/water-summary.interface';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface SummaryChartProps {
  userId: string;
}

export default function SummaryChart({ userId }: SummaryChartProps) {
  const [data, setData] = useState<WaterSummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE}/water-summary/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch summary');
        const json: WaterSummaryResponse[] = await res.json();
        setData(json.reverse());
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, API_BASE]);

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p>Error: {error}</p>;

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Water Intake (ml)',
        data: data.map((d) => d.totalIntake),
        backgroundColor: '#3b82f6',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Water Intake - Last 7 Days',
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 2000,
        ticks: {
          stepSize: 500,
        },
        grid: {
          color: '#e5e7eb',
        },
        title: {
          display: true,
          text: 'Intake (ml)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions as any} />;
}
