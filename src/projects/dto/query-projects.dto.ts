import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class QueryProjectsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  technology?: string;

  @IsOptional()
  @IsBooleanString()
  featured?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  sortOrder?: string;
}
