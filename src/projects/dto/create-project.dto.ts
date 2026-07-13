import { IsArray, IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
