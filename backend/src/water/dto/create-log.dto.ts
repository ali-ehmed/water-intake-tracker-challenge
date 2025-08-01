import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString } from '@nestjs/class-validator';

export class CreateLogDto {

  @ApiProperty({ example: '12', description: 'User ID' })
  @IsString()
  userId: string;

  @ApiProperty({
    example: '2025-08-01',
    description: 'Date in YYYY-MM-DD format',
  })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 1800, description: 'Intake in milliliters' })
  @IsInt()
  intakeMl: number;
}
