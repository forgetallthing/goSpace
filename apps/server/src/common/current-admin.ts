import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface JwtAdminPayload {
  sub: string;
  username: string;
  role: 'admin';
}

export const CurrentAdmin = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtAdminPayload | undefined => {
    const request = context.switchToHttp().getRequest();
    return request.user as JwtAdminPayload | undefined;
  },
);