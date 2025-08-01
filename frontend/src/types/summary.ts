export interface SummaryResponseDTO {
  date: string;
  totalIntake: number;
  percentageOfGoal: number;
}
export interface SummaryAPIResponse {
  data: SummaryResponseDTO[];
}
export interface LogWaterPayload {
  userId: string;
  date: string;
  intakeMl: number;
}