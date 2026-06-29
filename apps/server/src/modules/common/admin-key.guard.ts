import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const expectedKey = process.env.ADMIN_API_KEY;
    if (!expectedKey) {
      throw new UnauthorizedException('admin api key is not configured');
    }

    const providedKey = request.headers['x-admin-key'] ?? request.headers['x-admin-api-key'];
    if (providedKey !== expectedKey) {
      throw new UnauthorizedException('admin key invalid');
    }

    return true;
  }
}