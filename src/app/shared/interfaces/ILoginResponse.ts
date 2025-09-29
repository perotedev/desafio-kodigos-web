import {IUser} from './IUser';

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
  user: IUser;
}

export interface IRefreshResponse{
  token: string
}

export interface IPasswordCreation {
  code: string,
  password: string
}
