import client from './client';
export async function adminLogin(payload) {
    const response = await client.post('/admin/auth/login', payload);
    return response.data.data;
}
export async function fetchAdminMe() {
    const response = await client.get('/admin/auth/me');
    return response.data.data;
}
