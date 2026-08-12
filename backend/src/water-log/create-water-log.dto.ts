import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWaterLogDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  date: string; // Format: YYYY-MM-DD

  @IsNumber()
  intakeMl: number;
}
