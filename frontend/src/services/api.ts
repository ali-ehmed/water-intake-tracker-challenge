import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/water';

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

export const api = {
  logWaterIntake: async (data: WaterLogRequest) => {
    const response = await axios.post(`${API_BASE_URL}/log`, data);
    return response.data;
  },

  getWeeklySummary: async (userId: string): Promise<WaterSummaryItem[]> => {
    const response = await axios.get(`${API_BASE_URL}/summary/${userId}`);
    return response.data;
  },
}; 