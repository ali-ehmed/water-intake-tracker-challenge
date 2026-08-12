import { renderHook, act } from '@testing-library/react';
import { useWaterLog } from '../useWaterApi';
import { waterApi } from '../../lib/api';

// Mock the API
jest.mock('../../lib/api', () => ({
  waterApi: {
    logWaterIntake: jest.fn(),
    getWaterSummary: jest.fn(),
  },
}));

const mockedWaterApi = waterApi as jest.Mocked<typeof waterApi>;

describe('useWaterLog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully logs water intake', async () => {
    mockedWaterApi.logWaterIntake.mockResolvedValue({ success: true });
    
    const { result } = renderHook(() => useWaterLog());
    
    await act(async () => {
      await result.current.logWater({
        userId: 'test-user',
        date: '2023-12-01',
        intakeMl: 500,
      });
    });
    
    expect(result.current.success).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.isLoading).toBe(false);
  });

  it('handles API errors correctly', async () => {
    const errorMessage = 'Network error';
    mockedWaterApi.logWaterIntake.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useWaterLog());
    
    await act(async () => {
      await result.current.logWater({
        userId: 'test-user',
        date: '2023-12-01',
        intakeMl: 500,
      });
    });
    
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.isLoading).toBe(false);
  });

  it('resets state correctly', () => {
    const { result } = renderHook(() => useWaterLog());
    
    act(() => {
      result.current.resetState();
    });
    
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe(null);
  });
}); 