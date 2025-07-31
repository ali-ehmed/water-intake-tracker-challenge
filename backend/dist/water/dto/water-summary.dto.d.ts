export declare class WaterSummaryItemDto {
    date: string;
    totalIntake: number;
    percentageOfGoal: number;
}
export declare class WaterSummaryDto {
    userId: string;
    summary: WaterSummaryItemDto[];
}
