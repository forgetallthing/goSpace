import { apiClient } from './client';
import type { UpdateUserProfileRequest } from '@gospace/shared';

export function fetchUserProfile() {
  return apiClient.request<{ profile: unknown; stairSummary: unknown; medalCount: number }>({
    url: '/user/profile',
    method: 'GET',
  });
}

export function updateUserProfile(payload: UpdateUserProfileRequest) {
  return apiClient.request<{ profile: unknown }>({
    url: '/user/profile',
    method: 'PUT',
    data: payload,
  });
}