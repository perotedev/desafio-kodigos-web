import {IMetaData} from './IMetaData';

export interface IAdress extends IMetaData {
  id?: number;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}
