import { clearAuthStorage, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '../utils/storage';

const BASE_URL = 'http://localhost:3000/api';

interface ApiEnvelope<T> {
  code: number;
  message: string;
  data: T;
}

async function request<T>(options: UniApp.RequestOptions): Promise<T> {
  const accessToken = getAccessToken();

  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...options,
      url: `${BASE_URL}${options.url}`,
      header: {
        ...(options.header ?? {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      success: async (response) => {
        const payload = response.data as ApiEnvelope<T>;
        if (payload?.code === 0) {
          resolve(payload.data);
          return;
        }

        if (payload?.code === 40101) {
          const refreshToken = getRefreshToken();
          if (refreshToken) {
            const refreshed = await refreshAuth(refreshToken);
            if (refreshed) {
              const retry = await request<T>(options);
              resolve(retry);
              return;
            }
          }
          clearAuthStorage();
        }

        reject(new Error(payload?.message ?? 'request failed'));
      },
      fail: (error) => reject(error),
    });
  });
}

async function refreshAuth(refreshToken: string) {
  return new Promise<boolean>((resolve) => {
    uni.request({
      url: `${BASE_URL}/auth/refresh`,
      method: 'POST',
      data: { refreshToken },
      success: (response) => {
        const payload = response.data as ApiEnvelope<{ accessToken: string; refreshToken: string }>;
        if (payload?.code === 0) {
          setAccessToken(payload.data.accessToken);
          setRefreshToken(payload.data.refreshToken);
          resolve(true);
          return;
        }
        clearAuthStorage();
        resolve(false);
      },
      fail: () => resolve(false),
    });
  });
}

export const apiClient = {
  request,
};