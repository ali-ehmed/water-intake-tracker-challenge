'use client';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  annotationPlugin
);

type WaterSummary = {
  date: string;
  totalIntake: number;
};

export default function WaterChart ({ data }: { data: WaterSummary[] }) {
    const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: 'Water Intake (ml)',
        data: data.map((entry) => entry.totalIntake),
        backgroundColor: '#18aebf', 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Daily Water Intake (ml)',
        color: '#ffffff',
      },
      annotation: {
        annotations: {
          threshold: {
            type: 'line',
            yMin: 2000,
            yMax: 2000,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: 'Goal (2000 ml)',
              enabled: true,
              position: 'end',
              color: 'red',
            },
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },
        grid: { color: '#444' },
      },
      y: {
        title: {
          display: true,
          text: 'Water Intake (ml)',
          color: '#ffffff',
        },
        ticks: { color: '#ffffff' },
        grid: { color: '#444' },
      },
    },
  }; 
  return <Bar data={chartData} options={chartOptions as any} />;
}
