import { AxiosError, InternalAxiosRequestConfig } from 'axios';


export const RequestInterceptorResolve = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {

  return config;
};

export const RequestInterceptorReject = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};
