import axios, * as Axios from 'axios';
import moment from 'moment-timezone';

import { RequestInterceptorReject, RequestInterceptorResolve } from './request.interceptor';
import { ResponseInterceptorFulfilled, ResponseInterceptorRejected } from './response.interceptor';

const timezone = moment.tz.guess();

class ApiService {
  instance: Axios.AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}`,
      headers: { 'Content-Type': 'application/json', 'X-Custom-Timezone': timezone },
    });
    this.instance.interceptors.request.use(RequestInterceptorResolve, RequestInterceptorReject);
    this.instance.interceptors.response.use(
      ResponseInterceptorFulfilled,
      ResponseInterceptorRejected
    );
  }
}

const instance = new ApiService().instance;

export { instance as ApiService };
