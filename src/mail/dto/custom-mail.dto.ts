import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CustomMailDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsNotEmpty()
  @IsString()
  message!: string;
}
