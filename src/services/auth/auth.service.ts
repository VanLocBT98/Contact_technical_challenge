import { AxiosPromise } from 'axios';

import { ApiService } from '~/services/common/api.service';
import { CookieUtils } from '~/utils';

import { ILoginRequest, ITokenResponse, IUserResponse } from './types';

export enum AUTH_ENDPOINT {
  LOGIN = '/auth/login',
  LOGOUT = '/auth/logout',
  PROFILE = '/auth/me',
  REFRESH_TOKEN = '/auth/refresh-token'
}

class AuthService {
  isLogined = false;
  refreshTokenRequest: Promise<string> | AxiosPromise | null = null;
  async login(data: ILoginRequest): Promise<AxiosPromise> {
    try {
      const res = await ApiService.post(AUTH_ENDPOINT.LOGIN, data);
      this.isLogined = true;
      if (res.data) {
        this.setToken(res.data);
      }
      return res.data;
    } catch (error) {
      this.isLogined = false;
      return Promise.reject(error);
    }
  }

  async profile(): Promise<IUserResponse> {
    const res = await ApiService.get(AUTH_ENDPOINT.PROFILE);
    return res.data;
  }

  async logout(): Promise<AxiosPromise> {
    try {
      const res = await ApiService.post(AUTH_ENDPOINT.LOGOUT);
      if (res) {
        this.isLogined = false;
        CookieUtils.Remove('accessToken');
        CookieUtils.Remove('refreshToken');
      }
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  isAuthenticated() {
    if (this.isLogined) {
      return true;
    } else if (!!CookieUtils.Get('accessToken') || !!CookieUtils.Get('refreshToken')) {
      return true;
    } else {
      return false;
    }
  }

  refreshToken(): AxiosPromise {
    return ApiService.post(AUTH_ENDPOINT.REFRESH_TOKEN, {
      refreshToken: CookieUtils.Get('refreshToken')
    })
      .then((res) => {
        CookieUtils.Set(
          'accessToken',
          res.data.accessToken,
          new Date(res.data.accessExpire * 1000)
        );
        return res.data;
      })
      .catch((error) => {
        CookieUtils.Remove('accessToken');
        CookieUtils.Remove('refreshToken');
        this.isLogined = false;
        throw error;
      })
      .finally(() => {
        setTimeout(() => {
          this.refreshTokenRequest = null;
        }, 10000);
      });
  }

  getAccessToken() {
    return CookieUtils.Get('accessToken');
  }

  setToken(data: ITokenResponse) {
    const expired_access_token = new Date(data.accessExpire * 1000);
    const expired_refresh_token = new Date(data.refreshExpire * 1000);
    CookieUtils.Set('accessToken', data.accessToken, expired_access_token);
    CookieUtils.Set('refreshToken', data.refreshToken, expired_refresh_token);
  }
}

const authService = new AuthService();

export default authService;
