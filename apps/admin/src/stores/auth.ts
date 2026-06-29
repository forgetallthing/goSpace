import { defineStore } from 'pinia';
import { adminLogin, fetchAdminMe } from '../api/auth';
import { clearAdminToken, getAdminToken, setAdminToken } from '../utils/storage';

interface AdminState {
  token: string;
  username: string;
  ready: boolean;
}

export const useAdminAuthStore = defineStore('admin-auth', {
  state: (): AdminState => ({
    token: getAdminToken(),
    username: '',
    ready: false,
  }),
  actions: {
    async login(username: string, password: string) {
      const result = await adminLogin({ username, password });
      this.token = result.accessToken;
      this.username = result.user.username;
      setAdminToken(result.accessToken);
      return result;
    },
    async bootstrap() {
      if (!this.token) {
        this.ready = true;
        return;
      }

      try {
        const me = await fetchAdminMe();
        this.username = me.username;
      } catch {
        this.logout();
      } finally {
        this.ready = true;
      }
    },
    logout() {
      this.token = '';
      this.username = '';
      this.ready = true;
      clearAdminToken();
    },
  },
});