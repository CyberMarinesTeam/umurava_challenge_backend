/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateChallengeDto {
  @ApiProperty({
    example: 'Project1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '10/12/2023',
    required: true,
  })
  @IsString()
  deadline: string;

  @ApiProperty({
    example: '10',
    required: true,
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    example: '1000',
    required: true,
  })
  @IsNumber()
  moneyPrice: number;

  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @IsEmail()
  contactEmail: string;

  @ApiProperty({
    example: 'creating project 1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  projectDescription: string;

  @ApiProperty({
    example: 'brief about this project',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  projectBrief: string;

  @ApiProperty({
    example: '[task1, task2, task3, task4]',
    required: true,
  })
  @IsArray()
  @IsString({ each: true })
  tasks: string[];

  @ApiProperty({
    example: 'development',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
