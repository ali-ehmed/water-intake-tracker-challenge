'use client';

import { useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useWaterSummary } from '@/hooks/useWaterApi';
import { formatDateDisplay, getDefaultUserId } from '@/lib/utils';
import { Loader2, AlertCircle, TrendingUp } from 'lucide-react';

const DAILY_GOAL = 2000;

export function WaterSummaryChart() {
  const { data, isLoading, error, fetchSummary } = useWaterSummary();

  useEffect(() => {
    fetchSummary(getDefaultUserId());
  }, [fetchSummary]);

  const formatTooltipContent = (value: number, name: string) => {
    if (name === 'totalIntake') {
      return [`${value}ml`, 'Water Intake'];
    }
    return [value, name];
  };

  const chartData = data?.data.map(item => ({
    ...item,
    displayDate: formatDateDisplay(item.date),
  })) || [];

  const averageIntake = chartData.length > 0 
    ? Math.round(chartData.reduce((sum, item) => sum + item.totalIntake, 0) / chartData.length)
    : 0;

  const daysAboveGoal = chartData.filter(item => item.totalIntake >= DAILY_GOAL).length;

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading water summary...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageIntake}ml</div>
            <p className="text-xs text-muted-foreground">
              {averageIntake >= DAILY_GOAL ? 'Above' : 'Below'} daily goal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Above Goal</CardTitle>
            <span className="text-lg">🎯</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{daysAboveGoal}/7</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((daysAboveGoal / 7) * 100)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Goal</CardTitle>
            <span className="text-lg">💧</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DAILY_GOAL}ml</div>
            <p className="text-xs text-muted-foreground">
              Recommended daily intake
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Water Intake Summary</CardTitle>
          <CardDescription>
            Your water consumption over the last 7 days. The red line shows your daily goal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="displayDate"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}ml`}
              />
              <Tooltip 
                formatter={formatTooltipContent}
                labelStyle={{ color: '#000' }}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #ccc',
                  borderRadius: '6px'
                }}
              />
              <ReferenceLine 
                y={DAILY_GOAL} 
                stroke="#ef4444" 
                strokeDasharray="5 5" 
                label={{ value: "Daily Goal (2000ml)", position: "insideTopRight" }}
              />
              <Bar 
                dataKey="totalIntake" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
} 