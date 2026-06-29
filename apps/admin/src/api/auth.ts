import client from './client';

export interface AdminLoginResult {
  accessToken: string;
  user: {
    username: string;
    role: 'admin';
  };
}

export async function adminLogin(payload: { username: string; password: string }) {
  const response = await client.post('/admin/auth/login', payload);
  return response.data.data as AdminLoginResult;
}

export async function fetchAdminMe() {
  const response = await client.get('/admin/auth/me');
  return response.data.data as { sub: string; username: string; role: 'admin' };
}