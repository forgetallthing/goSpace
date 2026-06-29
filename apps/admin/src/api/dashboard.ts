import client from './client';

export async function fetchDashboardStats() {
  const response = await client.get('/admin/dashboard/stats');
  return response.data.data as {
    totalUsers: number;
    activeUsers: number;
    totalRecords: number;
    medalConfigs: number;
    enabledMedals: number;
    unlockedMedals: number;
    totalFloors: number;
    totalMeters: number;
    recentUsers: Array<Record<string, unknown>>;
    recentRecords: Array<Record<string, unknown>>;
  };
}