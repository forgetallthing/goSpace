export interface AdminLoginResult {
    accessToken: string;
    user: {
        username: string;
        role: 'admin';
    };
}
export declare function adminLogin(payload: {
    username: string;
    password: string;
}): Promise<AdminLoginResult>;
export declare function fetchAdminMe(): Promise<{
    sub: string;
    username: string;
    role: "admin";
}>;
