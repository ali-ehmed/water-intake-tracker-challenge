import { IsString, IsDateString, IsInt } from 'class-validator';

export class CreateWaterLogDto {
  @IsString()
  userId: string;

  @IsDateString()
  date: string;

  @IsInt()
  intakeMl: number;
}
