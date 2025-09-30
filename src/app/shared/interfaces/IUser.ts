import {IPerson} from './IPerson';
import {IUserConfig} from './IUserConfig';

export interface IUser {
  id?: number;
  email: string;
  people: IPerson;
  role: string;
  userConfig: IUserConfig;
}
