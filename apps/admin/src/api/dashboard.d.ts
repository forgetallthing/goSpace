export declare function fetchDashboardStats(): Promise<{
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
}>;
