import { RESPONSE_CODE } from './status';

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  traceId?: string;
}

export function success<T>(data: T, message = 'ok'): ApiResponse<T> {
  return {
    code: RESPONSE_CODE.SUCCESS,
    message,
    data,
  };
}