import {IPerson} from './IPerson';
import {IUserConfig} from './IUserConfig';

export interface IUser {
  id?: number;
  email: string;
  person: IPerson;
  role: string;
  userConfig: IUserConfig;
}
