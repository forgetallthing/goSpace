import { apiClient } from './client';
import type { StairHomeData, StairRecordCreateRequest } from '@gospace/shared';

export function fetchStairHome() {
  return apiClient.request<StairHomeData>({
    url: '/stair/home',
    method: 'GET',
  });
}

export function createStairRecord(payload: StairRecordCreateRequest) {
  return apiClient.request<{ recordId: string; updatedSummary: unknown; unlockedMedals: unknown[] }>({
    url: '/stair/records',
    method: 'POST',
    data: payload,
  });
}