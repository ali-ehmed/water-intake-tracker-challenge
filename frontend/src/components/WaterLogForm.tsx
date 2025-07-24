'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { waterLogSchema, WaterLogFormData } from '@/lib/validations';
import { useWaterLog } from '@/hooks/useWaterApi';
import { formatDate, getDefaultUserId } from '@/lib/utils';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export function WaterLogForm() {
  const { logWater, isLoading, error, success, resetState } = useWaterLog();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaterLogFormData>({
    resolver: zodResolver(waterLogSchema),
    defaultValues: {
      date: formatDate(new Date()),
      intakeMl: undefined,
    },
  });

  const onSubmit = async (data: WaterLogFormData) => {
    resetState();
    await logWater({
      userId: getDefaultUserId(),
      date: data.date,
      intakeMl: data.intakeMl,
    });
  };

  const handleReset = () => {
    reset({
      date: formatDate(new Date()),
      intakeMl: 0,
    });
    resetState();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💧 Log Water Intake
        </CardTitle>
        <CardDescription>
          Track your daily water consumption to stay hydrated!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              {...register('date')}
              className={errors.date ? 'border-red-500' : ''}
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="intakeMl">Water Intake (ml)</Label>
            <Input
              id="intakeMl"
              type="number"
              placeholder="e.g., 250"
              {...register('intakeMl', { valueAsNumber: true })}
              className={errors.intakeMl ? 'border-red-500' : ''}
            />
            {errors.intakeMl && (
              <p className="text-sm text-red-500">{errors.intakeMl.message}</p>
            )}
            <div className="text-xs text-gray-500 space-y-1">
              <p>💡 Quick amounts:</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentDate = document.getElementById('date') as HTMLInputElement;
                    reset({ date: currentDate.value, intakeMl: 250 });
                  }}
                >
                  Glass (250ml)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentDate = document.getElementById('date') as HTMLInputElement;
                    reset({ date: currentDate.value, intakeMl: 500 });
                  }}
                >
                  Bottle (500ml)
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-500 text-green-700">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Water intake logged successfully! 🎉
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Log Water
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 