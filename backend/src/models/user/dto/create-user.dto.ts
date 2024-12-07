import { UserRole, UserStatus } from '@/models/user/entities/user.entity';
import { IsEmail, IsEnum, IsInt, IsOptional, Length } from 'class-validator';
export class CreateUserDto {
  @Length(1, 50)
  fullname: string;
  @IsEmail()
  email: string;
  @Length(8, 50)
  password: string;
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
  @IsOptional()
  @IsInt()
  restaurantId?: number;
}
