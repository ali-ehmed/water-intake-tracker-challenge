/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, IsDateString, Min } from 'class-validator';

export class CreateWaterLogDto {
  @IsString()
  userId: string;

  @IsDateString()
  date: string; // YYYY-MM-DD format

  @IsNumber()
  @Min(1)
  intakeMl: number;
}
