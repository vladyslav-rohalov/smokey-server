import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(13, 13, {
    message: 'The phone number must be 13 symbols',
  })
  readonly phone: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, {
    message: 'Password too weak',
  })
  password: string;

  readonly role: string = 'user';
}
