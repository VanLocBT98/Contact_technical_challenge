export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IUserResponse {
  username: string;
  // ect...
}

export interface ITokenResponse {
  accessToken: string;
  accessExpire: number;
  refreshToken: string;
  refreshExpire: number;
}

export type ILoginResponse = ITokenResponse & IUserResponse;

export type IUser = IUserResponse;
