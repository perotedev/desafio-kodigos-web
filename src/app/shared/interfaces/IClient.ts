import {IAdress} from './IAdress';
import {IMetaData} from './IMetaData';
import {IContract} from './IContract';

export interface IClient extends IMetaData {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  cnpj?: string;
  adress_id: number;
  adress: IAdress;
  contracts: IContract[]
}
