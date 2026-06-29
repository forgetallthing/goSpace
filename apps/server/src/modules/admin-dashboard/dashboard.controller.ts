import { Controller, Get, UseGuards } from '@nestjs/common';
import { success } from '../../common/api-response';
import { AdminJwtGuard } from '../admin-auth/admin-jwt.guard';
import { DashboardService } from './dashboard.service';

@Controller('admin/dashboard')
@UseGuards(AdminJwtGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async stats() {
    return success(await this.dashboardService.getStats());
  }
}