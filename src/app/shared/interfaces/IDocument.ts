import {IMetaData} from './IMetaData';

export interface IDocument extends IMetaData{
  id?: number;
  name: string;
  path: string;
  type: string;
  size: number;
}
