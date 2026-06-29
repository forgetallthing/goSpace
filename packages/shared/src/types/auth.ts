import type { UserProfile } from './user';

export interface WechatLoginRequest {
  code: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponseData extends AuthTokens {
  needProfileComplete: boolean;
  user: UserProfile;
}