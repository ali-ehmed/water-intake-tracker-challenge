import { useState, useCallback } from 'react';
import { waterApi, WaterLogRequest, WaterSummaryResponse } from '@/lib/api';

export function useWaterLog() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const logWater = async (data: WaterLogRequest) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await waterApi.logWaterIntake(data);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log water intake');
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    logWater,
    isLoading,
    error,
    success,
    resetState,
  };
}

export function useWaterSummary() {
  const [data, setData] = useState<WaterSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const summary = await waterApi.getWaterSummary(userId);
      setData(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch water summary');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchSummary,
  };
} 