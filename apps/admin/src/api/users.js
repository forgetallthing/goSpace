import client from './client';
export async function fetchAdminUsers(params) {
    const response = await client.get('/admin/users', { params });
    return response.data.data;
}
