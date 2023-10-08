import { IsEmail, IsString, Length, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  @Length(13, 13, {
    message: 'The phone number must be 13 symbols',
  })
  phone: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
}
