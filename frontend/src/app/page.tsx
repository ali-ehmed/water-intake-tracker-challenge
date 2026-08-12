import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, BarChart3, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          💧 Water Intake Tracker
        </h1>
        <p className="text-xl text-gray-600">
          Stay hydrated and healthy by tracking your daily water consumption
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              Log Water Intake
            </CardTitle>
            <CardDescription>
              Record your daily water consumption to meet your hydration goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/log">
              <Button className="w-full">Start Logging</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              View Summary
            </CardTitle>
            <CardDescription>
              Analyze your hydration patterns with visual charts and statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/summary">
              <Button variant="outline" className="w-full">View Analytics</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Target className="h-5 w-5" />
            Daily Hydration Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <div className="text-3xl font-bold mb-2">2,000ml</div>
          <p className="text-sm">
            The recommended daily water intake for optimal health and well-being.
            Track your progress and stay consistent with your hydration habits!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
