import { WaterSummaryChart } from '@/components/WaterSummaryChart';

export default function SummaryPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Water Intake Summary
        </h1>
        <p className="text-lg text-gray-600">
          Analyze your hydration patterns and track your progress over time
        </p>
      </div>

      <WaterSummaryChart />
    </div>
  );
} 