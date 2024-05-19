import { AxiosError, AxiosResponse } from 'axios';

import authService, { AUTH_ENDPOINT } from '~/services/auth/auth.service';

import { ApiService } from './api.service';

export function ResponseInterceptorFulfilled(
  response: AxiosResponse<AxiosResponse>
): AxiosResponse {
  return response.data;
}

export function ResponseInterceptorRejected(error: AxiosError<AxiosError>) {
  const config = error.response?.config || {};
  if (error.response?.status !== 401 || error.config?.url?.includes(AUTH_ENDPOINT.REFRESH_TOKEN)) {
    return Promise.reject(error);
  } else {
    authService.refreshTokenRequest = authService.refreshTokenRequest
      ? authService.refreshTokenRequest
      : authService.refreshToken();

    return authService.refreshTokenRequest.then(() => {
      return ApiService({ ...config });
    });
  }
}
