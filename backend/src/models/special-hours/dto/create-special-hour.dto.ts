import { IsBoolean, IsDate, IsInt, Length } from 'class-validator';

export class CreateSpecialHourDto {
  @IsInt()
  restaurantId: number;
  @IsDate()
  dayDate: Date;
  @Length(5, 5)
  openTime?: string;
  @Length(5, 5)
  closeTime?: string;
  @IsBoolean()
  isClosed: boolean;
}
