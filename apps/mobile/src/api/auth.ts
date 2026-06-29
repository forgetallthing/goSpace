import { apiClient } from './client';
import type { LoginResponseData, RefreshTokenRequest, WechatLoginRequest } from '@gospace/shared';

export async function wechatLogin(payload: WechatLoginRequest) {
  return apiClient.request<LoginResponseData>({
    url: '/auth/wechat/login',
    method: 'POST',
    data: payload,
  });
}

export async function refreshToken(payload: RefreshTokenRequest) {
  return apiClient.request<{ accessToken: string; refreshToken: string }>({
    url: '/auth/refresh',
    method: 'POST',
    data: payload,
  });
}