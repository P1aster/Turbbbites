import { OmitType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @IsInt()
  id: number;
}
