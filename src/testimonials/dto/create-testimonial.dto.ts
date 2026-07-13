import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsString()
  message: string;

  @IsOptional()
  @IsBoolean()
  approved?: boolean;
}
