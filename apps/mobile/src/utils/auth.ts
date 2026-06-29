import { wechatLogin } from '../api/auth';
import { useAuthStore } from '../store/auth';

export async function ensureLoggedIn() {
  const authStore = useAuthStore();
  if (authStore.accessToken) {
    return authStore.accessToken;
  }

  const code = await new Promise<string>((resolve, reject) => {
    wx.login({
      success: (result) => {
        if (result.code) {
          resolve(result.code);
          return;
        }
        reject(new Error('wx.login failed'));
      },
      fail: reject,
    });
  });

  const loginResult = await wechatLogin({ code });
  authStore.setTokens(loginResult.accessToken, loginResult.refreshToken);
  authStore.setProfile(loginResult.user);
  return loginResult.accessToken;
}