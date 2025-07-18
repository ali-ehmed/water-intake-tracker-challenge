'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { WaterSummaryItem } from '@/services/api';

interface WaterSummaryChartProps {
  data: WaterSummaryItem[];
}

export default function WaterSummaryChart({ data }: WaterSummaryChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{formatDate(label)}</p>
          <p className="text-blue-600">Intake: {data.totalIntake} ml</p>
          <p className="text-gray-600">Goal: {data.percentageOfGoal}%</p>
        </div>
      );
    }
    return null;
  };

  // Check if 5+ days meet or exceed the goal (bonus feature)
  const daysMeetingGoal = data.filter(item => item.percentageOfGoal >= 100).length;
  const showWellDoneMessage = daysMeetingGoal >= 5;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Water Intake Summary</h2>
      
      {showWellDoneMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-semibold">🎉 Well done! You've met your goal for {daysMeetingGoal} out of 7 days!</p>
        </div>
      )}

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={2000} stroke="#ef4444" strokeDasharray="3 3" label="Goal (2000ml)" />
            <Bar dataKey="totalIntake" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Goal: 2,000 ml per day</p>
        <p>Days meeting goal: {daysMeetingGoal}/7</p>
      </div>
    </div>
  );
} 