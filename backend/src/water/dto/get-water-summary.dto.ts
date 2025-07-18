import { IsInt, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetWaterSummaryDto {
  @IsInt({ message: 'User ID must be an integer' })
  @IsPositive({ message: 'User ID must be positive' })
  @Transform(({ value }) => parseInt(value))
  userId: number;
}
