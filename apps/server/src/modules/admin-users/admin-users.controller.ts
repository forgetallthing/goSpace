import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { success } from '../../common/api-response';
import { AdminJwtGuard } from '../admin-auth/admin-jwt.guard';
import { AdminUsersService, AdminUserDetailResult, AdminUsersListResult } from './admin-users.service';

@Controller('admin/users')
@UseGuards(AdminJwtGuard)
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  async list(
    @Query('keyword') keyword = '',
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '20',
  ): Promise<{ code: number; message: string; data: AdminUsersListResult }> {
    return success(await this.adminUsersService.list(keyword, Number(page), Number(pageSize)));
  }

  @Get(':userId')
  async detail(@Param('userId') userId: string): Promise<{ code: number; message: string; data: AdminUserDetailResult }> {
    return success(await this.adminUsersService.detail(userId));
  }
}