import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewsletterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  name?: string;
}
