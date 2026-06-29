import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryMedalAdminDto {
  @IsOptional()
  @IsIn(['enabled', 'disabled'])
  status?: 'enabled' | 'disabled';

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  pageSize?: string;
}