import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import api from "./axios";

import { LogWaterPayload, SummaryResponseDTO } from "@/types/summary";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const getWaterSummaryKey = (userId: string) =>
  userId ? `http://localhost:3001/water-log/summary/${userId}` : null;

export const useWaterSummary = (userId: string) => {
  return useSWR<SummaryResponseDTO[]>(getWaterSummaryKey(userId), fetcher);
};

const postWaterLog = async (
  url: string,
  { arg }: { arg: LogWaterPayload }
) => {
  const response = await api.post(url, arg);
  return response.data;
};


export const useLogWaterIntake = () => {
  return useSWRMutation("/water-log", postWaterLog);
};
