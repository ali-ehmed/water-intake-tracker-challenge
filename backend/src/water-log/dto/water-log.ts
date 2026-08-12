export interface SummaryRawDTO {
  date: string;
  totalIntake: bigint; 
}

export interface SummaryResponseDTO {
  date: string;
  totalIntake: number;
  percentageOfGoal: number;
}