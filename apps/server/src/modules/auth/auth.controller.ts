import { Body, Controller, Post } from '@nestjs/common';
import { success } from '../../common/api-response';
import { AuthService } from './auth.service';
import { WechatLoginDto } from './dto/wechat-login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('wechat/login')
  async wechatLogin(@Body() dto: WechatLoginDto) {
    return success(await this.authService.loginByWechat(dto.code));
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return success(await this.authService.refresh(dto.refreshToken));
  }

  @Post('logout')
  async logout(@Body() dto: RefreshTokenDto) {
    await this.authService.logout(dto.refreshToken);
    return success(true);
  }
}