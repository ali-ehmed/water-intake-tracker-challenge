import { IsInt, IsString } from 'class-validator';

export class CreateWaterLogDto {
  @IsString()
  userId: string;
  @IsString()
  date: string;
  @IsInt()
  intakeMl: number;
}
