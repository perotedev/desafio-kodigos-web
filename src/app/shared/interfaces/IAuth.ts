import {IUser} from './IUser';

export interface IAuthLogin {
  username: string;
  password: string;
}

export interface IAuthReponse {
  access_token: string;
  token_type: string;
  user: IUser;
}
