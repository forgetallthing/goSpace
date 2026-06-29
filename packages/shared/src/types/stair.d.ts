import type { MedalSummary, MedalWallItem } from './medal';
export interface StairSummary {
    totalFloors: number;
    totalMeters: number;
    latestRecordTime?: string;
}
export interface StairRecord {
    recordId: string;
    meters: number;
    floors: number;
    recordTime: string;
    remark?: string;
    source: 'manual' | 'import' | 'device';
}
export interface StairRecordCreateRequest {
    meters: number;
    floors: number;
    recordTime: string;
    remark?: string;
    source?: 'manual' | 'import' | 'device';
}
export interface StairHomeData {
    userSummary: StairSummary;
    medalWall: MedalWallItem[];
    currentMedal: MedalWallItem | null;
    nextMedal: MedalWallItem | null;
    unlockedMedals: MedalSummary[];
}
