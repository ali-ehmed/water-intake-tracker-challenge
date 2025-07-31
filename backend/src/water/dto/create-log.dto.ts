import { IsDateString, IsInt, IsString } from '@nestjs/class-validator';

export class CreateLogDto {
  @IsString()
  userId: string;

  @IsDateString()
  date: string;

  @IsInt()
  intakeMl: number;
}
