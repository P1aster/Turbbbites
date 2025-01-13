import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 50)
  password: string;

  @IsString()
  @Length(3, 50)
  fullname: string;
}
