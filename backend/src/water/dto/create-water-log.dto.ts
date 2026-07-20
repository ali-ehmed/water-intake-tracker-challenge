import { IsInt, IsString, IsPositive, Matches, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateWaterLogDto {
  @IsInt({ message: 'User ID must be an integer' })
  @IsPositive({ message: 'User ID must be positive' })
  userId: number;

  @IsString({ message: 'Date must be a string' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format'
  })
  date: string;

  @IsInt({ message: 'Intake must be an integer' })
  @Min(1, { message: 'Intake must be at least 1ml' })
  @Transform(({ value }) => parseInt(value))
  intakeMl: number;
}


// src/water/dto/water-summary-response.dto.ts
export class WaterSummaryResponseDto {
  date: string;
  totalIntake: number;
  percentageOfGoal: number;
}
