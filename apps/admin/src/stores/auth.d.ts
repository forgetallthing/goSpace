interface AdminState {
    token: string;
    username: string;
    ready: boolean;
}
export declare const useAdminAuthStore: import("pinia").StoreDefinition<"admin-auth", AdminState, {}, {
    login(username: string, password: string): Promise<import("../api/auth").AdminLoginResult>;
    bootstrap(): Promise<void>;
    logout(): void;
}>;
export {};
