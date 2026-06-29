import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  login(username: string, password: string) {
    const expectedUsername = this.configService.get<string>('ADMIN_USERNAME') ?? 'su';
    const expectedPassword = this.configService.get<string>('ADMIN_PASSWORD') ?? 'su';

    if (username !== expectedUsername || password !== expectedPassword) {
      throw new UnauthorizedException('管理员账号或密码错误');
    }

    const accessToken = this.jwtService.sign(
      {
        sub: 'admin',
        username: expectedUsername,
        role: 'admin',
      },
      {
        secret: this.configService.get<string>('ADMIN_JWT_SECRET') ?? 'dev-admin-secret',
        expiresIn: this.configService.get<string>('ADMIN_JWT_EXPIRES_IN') ?? '12h',
      },
    );

    return {
      accessToken,
      user: {
        username: expectedUsername,
        role: 'admin' as const,
      },
    };
  }
}