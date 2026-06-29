import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { success } from '../../common/api-response';
import { CurrentAdmin, JwtAdminPayload } from '../../common/current-admin';
import { AdminJwtGuard } from './admin-jwt.guard';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminAuthService } from './admin-auth.service';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  login(@Body() dto: AdminLoginDto) {
    return success(this.adminAuthService.login(dto.username, dto.password));
  }

  @Get('me')
  @UseGuards(AdminJwtGuard)
  me(@CurrentAdmin() admin: JwtAdminPayload) {
    return success(admin);
  }
}