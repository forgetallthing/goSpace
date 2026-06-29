export declare function fetchAdminUsers(params: {
    keyword?: string;
    page?: number;
    pageSize?: number;
}): Promise<{
    list: Array<Record<string, unknown>>;
    total: number;
    page: number;
    pageSize: number;
}>;
