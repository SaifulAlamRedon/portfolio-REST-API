import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PasswordResetMailDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  resetToken!: string;

  @IsOptional()
  @IsString()
  resetUrl?: string;
}
