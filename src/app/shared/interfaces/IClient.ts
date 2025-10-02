import {IAdress} from './IAdress';
import {IMetaData} from './IMetaData';
import {IContract} from './IContract';

export interface IClient extends IMetaData {
  id?: number;
  name: string;
  email: string | null;
  phone?: string;
  cnpj: string | null;
  address_id: number;
  address: IAdress;
  contracts: IContract[]
}
