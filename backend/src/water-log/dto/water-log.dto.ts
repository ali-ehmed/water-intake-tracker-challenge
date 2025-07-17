import { IsString, IsDateString, IsInt, Min } from 'class-validator';

export class WaterLogDto {
  @IsString()
  userId: string;

  @IsDateString()
  date: string;

  @IsInt()
  @Min(0)
  intakeMl: number;
}
