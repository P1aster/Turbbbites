import {
  IsBoolean,
  IsMilitaryTime,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateBusinessHourDto {
  @IsNumber()
  restaurantId: number;

  @IsNumber()
  dayOfWeek: number;

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
