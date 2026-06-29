export declare function fetchAdminMedals(params: {
    keyword?: string;
    page?: number;
    pageSize?: number;
}): Promise<{
    list: Array<Record<string, unknown>>;
    total: number;
    page: number;
    pageSize: number;
}>;
export declare function fetchAdminMedalDetail(medalId: string): Promise<Record<string, unknown>>;
export declare function createAdminMedal(payload: Record<string, unknown>): Promise<Record<string, unknown>>;
export declare function updateAdminMedal(medalId: string, payload: Record<string, unknown>): Promise<Record<string, unknown>>;
export declare function deleteAdminMedal(medalId: string): Promise<Record<string, unknown>>;
