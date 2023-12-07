import { IsEmail, IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateGoogleDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly googleId: string;

  readonly role: string = 'user';
}
