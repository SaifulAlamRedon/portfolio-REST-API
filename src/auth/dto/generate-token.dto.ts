import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GenerateTokenDto {
  @IsMongoId()
  @IsNotEmpty()
  userId!: string;
}