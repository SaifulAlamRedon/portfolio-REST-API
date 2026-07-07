import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PasswordChangedMailDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  message?: string;
}
