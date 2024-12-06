export class CreateBusinessHourDto {
  restaurantId: number;
  dayOfWeek: number;
  openTime?: string;
  closeTime?: string;
  isClosed: boolean;
}
