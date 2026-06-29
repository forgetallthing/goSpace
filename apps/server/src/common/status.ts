export const RESPONSE_CODE = {
  SUCCESS: 0,
  UNAUTHORIZED: 40101,
  VALIDATION_ERROR: 40001,
  NOT_FOUND: 40401,
  SERVER_ERROR: 50001,
} as const;

export const MEDAL_STATUS = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
} as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  DISABLED: 'disabled',
} as const;