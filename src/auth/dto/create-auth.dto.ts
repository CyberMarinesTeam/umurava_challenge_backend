import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { RoleEnum } from '../enums/role.enum';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
