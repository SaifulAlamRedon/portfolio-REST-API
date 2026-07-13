import { IsOptional, IsString } from 'class-validator';

export class CreateCertificateDto {
  @IsString()
  title: string;

  @IsString()
  issuer: string;

  @IsString()
  issueDate: string;

  @IsOptional()
  @IsString()
  credentialUrl?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
