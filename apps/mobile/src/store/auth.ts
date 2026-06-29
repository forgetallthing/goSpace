import { defineStore } from 'pinia';
import { clearAuthStorage, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, setUserProfile } from '../utils/storage';

interface AuthState {
  accessToken: string;
  refreshToken: string;
  userProfile: unknown | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: getAccessToken() ?? '',
    refreshToken: getRefreshToken() ?? '',
    userProfile: null,
  }),
  actions: {
    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    },
    setProfile(profile: unknown) {
      this.userProfile = profile;
      setUserProfile(profile);
    },
    logout() {
      this.accessToken = '';
      this.refreshToken = '';
      this.userProfile = null;
      clearAuthStorage();
    },
  },
});