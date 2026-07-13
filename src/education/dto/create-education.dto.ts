import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  institution: string;

  @IsString()
  degree: string;

  @IsString()
  fieldOfStudy: string;

  @IsNumber()
  startYear: number;

  @IsOptional()
  @IsNumber()
  endYear?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
