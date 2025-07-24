export class WaterSummaryItemDto {
  date: string;
  totalIntake: number;
  percentageOfGoal: number;
}

export class WaterSummaryDto {
  data: WaterSummaryItemDto[];
}
