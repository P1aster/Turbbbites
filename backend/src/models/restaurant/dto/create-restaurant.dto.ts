import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsPostalCode('PL')
  postalCode: string;

  @Transform(({ value }) => {
    const lowercased = value.toLowerCase();
    return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsOptional()
  contactInformation?: string;
}
