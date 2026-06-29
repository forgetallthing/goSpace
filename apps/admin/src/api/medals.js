import client from './client';
export async function fetchAdminMedals(params) {
    const response = await client.get('/admin/medals', { params });
    return response.data.data;
}
export async function fetchAdminMedalDetail(medalId) {
    const response = await client.get(`/admin/medals/${medalId}`);
    return response.data.data;
}
export async function createAdminMedal(payload) {
    const response = await client.post('/admin/medals', payload);
    return response.data.data;
}
export async function updateAdminMedal(medalId, payload) {
    const response = await client.patch(`/admin/medals/${medalId}`, payload);
    return response.data.data;
}
export async function deleteAdminMedal(medalId) {
    const response = await client.delete(`/admin/medals/${medalId}`);
    return response.data.data;
}
