import client from './client';

export async function fetchAdminMedals(params: { keyword?: string; page?: number; pageSize?: number }) {
  const response = await client.get('/admin/medals', { params });
  return response.data.data as {
    list: Array<Record<string, unknown>>;
    total: number;
    page: number;
    pageSize: number;
  };
}

export async function fetchAdminMedalDetail(medalId: string) {
  const response = await client.get(`/admin/medals/${medalId}`);
  return response.data.data as Record<string, unknown>;
}

export async function createAdminMedal(payload: Record<string, unknown>) {
  const response = await client.post('/admin/medals', payload);
  return response.data.data as Record<string, unknown>;
}

export async function updateAdminMedal(medalId: string, payload: Record<string, unknown>) {
  const response = await client.patch(`/admin/medals/${medalId}`, payload);
  return response.data.data as Record<string, unknown>;
}

export async function deleteAdminMedal(medalId: string) {
  const response = await client.delete(`/admin/medals/${medalId}`);
  return response.data.data as Record<string, unknown>;
}