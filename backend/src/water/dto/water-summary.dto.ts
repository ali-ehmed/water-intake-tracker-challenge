export class WaterSummaryItemDto {
  date: string; // YYYY-MM-DD format
  totalIntake: number;
  percentageOfGoal: number;
}

export class WaterSummaryDto {
  userId: string;
  summary: WaterSummaryItemDto[];
} 