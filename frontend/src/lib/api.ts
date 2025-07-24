import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface WaterLogRequest {
  userId: string;
  date: string;
  intakeMl: number;
}

export interface WaterSummaryItem {
  date: string;
  totalIntake: number;
  percentageOfGoal: number;
}

export interface WaterSummaryResponse {
  data: WaterSummaryItem[];
}

export const waterApi = {
  logWaterIntake: async (data: WaterLogRequest) => {
    const response = await apiClient.post('/water-log', data);
    return response.data;
  },

  getWaterSummary: async (userId: string): Promise<WaterSummaryResponse> => {
    const response = await apiClient.get(`/water-summary/${userId}`);
    return response.data;
  },
}; 