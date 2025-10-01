import {IMetaData} from './IMetaData';

export interface IPerson extends IMetaData{
  id?: number;
  name: string;
  phone?: string;
  cpf?: string;
  birth: string;
}
