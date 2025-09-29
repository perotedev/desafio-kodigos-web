import {IPeople} from './IPeople';
import {IUserConfig} from './IUserConfig';

export interface IUser {
  id?: number;
  email: string;
  people: IPeople;
  role: string;
  userConfig: IUserConfig;
}
