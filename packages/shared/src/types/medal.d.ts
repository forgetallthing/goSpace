export interface MedalConfig {
    medalId: string;
    medalKey: string;
    name: string;
    description: string;
    iconImage?: string;
    backgroundImage?: string;
    baseMeters: number;
    unlockMeters: number;
    starLevel: 1 | 2 | 3;
    sortOrder: number;
    status: 'enabled' | 'disabled';
}
export interface MedalSummary {
    medalId: string;
    name: string;
    starLevel: 1 | 2 | 3;
    unlocked: boolean;
    unlockMeters: number;
    progressMeters: number;
}
export interface MedalWallItem extends MedalSummary {
    description: string;
    iconImage?: string;
    backgroundImage?: string;
}
export interface MedalDetail extends MedalWallItem {
    medalKey: string;
    sortOrder: number;
}
