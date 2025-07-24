import { WaterLogForm } from '@/components/WaterLogForm';

export default function LogPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Log Water Intake
        </h1>
        <p className="text-lg text-gray-600">
          Record your daily water consumption to track your hydration progress
        </p>
      </div>

      <WaterLogForm />

      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Hydration Tips</h3>
        <ul className="space-y-2 text-blue-700">
          <li>• Start your day with a glass of water</li>
          <li>• Keep a water bottle at your desk</li>
          <li>• Set reminders to drink water throughout the day</li>
          <li>• Eat water-rich foods like fruits and vegetables</li>
          <li>• Monitor your urine color as a hydration indicator</li>
        </ul>
      </div>
    </div>
  );
} 