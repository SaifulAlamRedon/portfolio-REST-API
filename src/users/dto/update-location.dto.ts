import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  location!: string;
}
