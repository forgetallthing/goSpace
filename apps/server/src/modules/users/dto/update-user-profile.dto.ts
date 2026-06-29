import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsNumber()
  gender?: number;

  @IsOptional()
  @IsString()
  birthday?: string;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;
}