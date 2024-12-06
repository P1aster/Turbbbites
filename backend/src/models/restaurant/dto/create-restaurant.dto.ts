import { IsString, Length } from 'class-validator';

export class CreateRestaurantDto {
  @Length(0, 200)
  description?: string;
  @IsString()
  address: string;
  @Length(1, 10)
  postalCode: string;
  @IsString()
  city: string;
  @Length(0, 400)
  contactInformation?: string;
}
