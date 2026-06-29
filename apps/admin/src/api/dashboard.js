import client from './client';
export async function fetchDashboardStats() {
    const response = await client.get('/admin/dashboard/stats');
    return response.data.data;
}
