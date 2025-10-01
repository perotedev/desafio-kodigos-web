import {IMetaData} from './IMetaData';
import {IContractDocument} from './IContractDocument';

export interface IContract extends IMetaData {
  id?: number;
  client_id?: number;
  number: string;
  date_start: Date;
  date_end: Date;
  value: number;
  description: string;
  document_list: IContractDocument[];
}
