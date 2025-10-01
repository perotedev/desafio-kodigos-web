import {IMetaData} from './IMetaData';

export type AppTheme = 'light' | 'dark';

export interface IUserConfig extends IMetaData {
  id?: number;
  expanded: boolean;
  theme: AppTheme;
}
