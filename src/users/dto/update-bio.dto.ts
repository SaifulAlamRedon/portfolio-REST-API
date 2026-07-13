import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateBioDto {
  @IsString()
  @MinLength(5)
  @MaxLength(250)
  bio!: string;
}
