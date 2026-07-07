import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUploadDto {
  @IsOptional()
  @IsString()
  folder?: string;

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsUrl()
  url?: string;
}
