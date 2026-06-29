import client from './client';

export async function fetchAdminUsers(params: { keyword?: string; page?: number; pageSize?: number }) {
  const response = await client.get('/admin/users', { params });
  return response.data.data as {
    list: Array<Record<string, unknown>>;
    total: number;
    page: number;
    pageSize: number;
  };
}