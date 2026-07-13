import { IsOptional, IsUrl } from 'class-validator';

export class UpdateSocialLinksDto {
  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @IsOptional()
  @IsUrl()
  portfolioUrl?: string;
}
