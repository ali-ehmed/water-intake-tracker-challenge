export class WaterSummaryItemDto {
  date: string; // YYYY-MM-DD
  totalIntake: number;
  percentageOfGoal: number;
}

export class WaterSummaryDto {
  userId: string;
  summary: WaterSummaryItemDto[];
} 