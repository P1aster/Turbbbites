import { UserRole, UserStatus } from '@/models/user/entities/user.entity';
import { IsEnum, IsInt, Length } from 'class-validator';
export class CreateUserDto {
  @Length(1, 50)
  name: string;
  @Length(1, 50)
  email: string;
  @Length(8, 50)
  password: string;
  @IsEnum(UserRole)
  role: UserRole;
  @IsEnum(UserStatus)
  status: UserStatus;
  @IsInt()
  restaurantId: number;
}
