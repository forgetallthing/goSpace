import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStairRecordDto {
  @IsNumber()
  meters!: number;

  @IsNumber()
  floors!: number;

  @IsString()
  recordTime!: string;

  @IsOptional()
  @IsString()
  remark?: string;

  @IsOptional()
  @IsString()
  source?: 'manual' | 'import' | 'device';
}