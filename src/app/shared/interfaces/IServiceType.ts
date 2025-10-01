import {IMetaData} from './IMetaData';

export interface IServiceType extends IMetaData {
  id?: number;
  name: string;
  description: string;
  icon: string;
}
