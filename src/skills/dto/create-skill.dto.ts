import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  percentage?: number;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;
}
