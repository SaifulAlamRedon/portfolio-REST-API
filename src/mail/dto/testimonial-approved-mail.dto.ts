import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TestimonialApprovedMailDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  testimonialId?: string;

  @IsOptional()
  @IsString()
  message?: string;
}
