import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtUserPayload } from '../../common/current-user';
import { success } from '../../common/api-response';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UsersService } from './users.service';

@Controller('user/profile')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getProfile(@CurrentUser() user: JwtUserPayload) {
    return success(await this.usersService.getProfile(user.sub));
  }

  @Put()
  async updateProfile(@CurrentUser() user: JwtUserPayload, @Body() dto: UpdateUserProfileDto) {
    return success(await this.usersService.updateProfile(user.sub, dto));
  }
}