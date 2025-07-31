export interface WaterSummaryRaw {
  date: string;
  totalIntake: bigint; // As returned by Prisma for SUM()
}

export interface WaterSummaryResponse {
  date: string;
  totalIntake: number;
  percentageOfGoal: number;
}
