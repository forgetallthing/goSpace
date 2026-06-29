import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateMedalConfigDto {
  @IsString()
  medalKey!: string;

  @IsOptional()
  @IsString()
  shortName?: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  iconImage?: string;

  @IsOptional()
  @IsString()
  backgroundImage?: string;

  @IsOptional()
  @IsString()
  animationPreset?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  animationDuration?: number;

  @IsNumber()
  @Min(0)
  baseMeters!: number;

  @IsNumber()
  @Min(0)
  unlockMeters!: number;

  @IsIn([1, 2, 3])
  starLevel!: 1 | 2 | 3;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  @IsIn(['enabled', 'disabled'])
  status?: 'enabled' | 'disabled';
}