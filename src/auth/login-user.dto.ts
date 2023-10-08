import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
