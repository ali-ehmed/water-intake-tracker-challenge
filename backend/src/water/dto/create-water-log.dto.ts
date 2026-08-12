import { IsString, IsInt, Min, Validate, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { isISO8601 } from 'validator';

// Custom validator for ISO strings that converts to timestamp
function IsISO8601Timestamp() {
  return function (target: any, propertyName: string) {
    Transform(({ value }) => {
      if (typeof value === 'string' && isISO8601(value)) {
        return Math.floor(new Date(value).getTime() / 1000);
      }
      return value;
    })(target, propertyName);

    Validate(
      (value: any) => {
        return (
          typeof value === 'number' ||
          (typeof value === 'string' && isISO8601(value))
        );
      },
      {
        message: 'Must be ISO 8601 string or timestamp',
      },
    )(target, propertyName);
  };
}

export class CreateWaterLogDto {
  @IsString()
  userId: string;

  @IsISO8601Timestamp() // Custom decorator
  date: number;

  @IsInt()
  @Min(0)
  intakeMl: number;
}
