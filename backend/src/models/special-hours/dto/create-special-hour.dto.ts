import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsNumber,
  IsMilitaryTime,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSpecialHourDto {
  @IsNumber()
  restaurantId: number;

  @Transform(({ value }) => {
    if (value) return new Date(value);
  })
  @IsDateString()
  @IsOptional()
  dayDate: string;

  @IsMilitaryTime()
  @IsOptional()
  openTime?: string;

  @IsMilitaryTime()
  @IsOptional()
  closeTime?: string;

  @IsBoolean()
  @IsOptional()
  isClosed?: boolean;
}
