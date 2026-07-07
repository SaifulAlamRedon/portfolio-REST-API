import { IsOptional, IsString } from 'class-validator';

export class CreateAnalyticsDto {
  @IsOptional()
  @IsString()
  event?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
