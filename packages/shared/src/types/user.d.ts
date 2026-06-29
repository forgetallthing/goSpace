export interface UserProfile {
    userId: string;
    openid: string;
    nickname?: string;
    avatarUrl?: string;
    gender?: number;
    birthday?: string;
    height?: number;
    weight?: number;
    status: 'active' | 'disabled';
    createdAt?: string;
    updatedAt?: string;
}
export interface UpdateUserProfileRequest {
    nickname?: string;
    avatarUrl?: string;
    gender?: number;
    birthday?: string;
    height?: number;
    weight?: number;
}
