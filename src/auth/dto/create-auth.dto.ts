import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  @IsEnum(['admin', 'talent'])
  @IsNotEmpty()
  role: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
