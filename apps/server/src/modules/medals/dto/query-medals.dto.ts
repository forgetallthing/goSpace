import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryMedalsDto {
  @IsOptional()
  @IsIn(['enabled', 'disabled'])
  status?: 'enabled' | 'disabled';

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  pageSize?: string;
}