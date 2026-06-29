const ACCESS_TOKEN_KEY = 'gospace_access_token';
const REFRESH_TOKEN_KEY = 'gospace_refresh_token';
const USER_PROFILE_KEY = 'gospace_user_profile';

export function getAccessToken() {
  return uni.getStorageSync(ACCESS_TOKEN_KEY) as string | undefined;
}

export function setAccessToken(token: string) {
  uni.setStorageSync(ACCESS_TOKEN_KEY, token);
}

export function getRefreshToken() {
  return uni.getStorageSync(REFRESH_TOKEN_KEY) as string | undefined;
}

export function setRefreshToken(token: string) {
  uni.setStorageSync(REFRESH_TOKEN_KEY, token);
}

export function clearAuthStorage() {
  uni.removeStorageSync(ACCESS_TOKEN_KEY);
  uni.removeStorageSync(REFRESH_TOKEN_KEY);
  uni.removeStorageSync(USER_PROFILE_KEY);
}

export function setUserProfile(profile: unknown) {
  uni.setStorageSync(USER_PROFILE_KEY, profile);
}

export function getUserProfile<T>() {
  return uni.getStorageSync(USER_PROFILE_KEY) as T | undefined;
}