import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class WelcomeMailDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  welcomeMessage?: string;
}
