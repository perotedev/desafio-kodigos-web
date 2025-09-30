import {IPerson} from './IPerson';
import {IUserConfig} from './IUserConfig';

export interface IUser {
  id?: number;
  email: string;
  person: IPerson;
  active: boolean;
  role: string;
  userConfig: IUserConfig;
}
