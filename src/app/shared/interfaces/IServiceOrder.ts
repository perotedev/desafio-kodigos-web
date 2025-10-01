import {ServiceOrderStatusEnum} from '../enums/ServiceOrderStatusEnum';
import {IMetaData} from './IMetaData';
import {IServiceOrderDocument} from './IServiceOrderDocument';

export interface IServiceOrder extends IMetaData {
  id?: number;
  client_id?: number;
  contract_id?: number;
  date_start?: Date;
  date_end?: Date;
  hour_start?: string;
  hour_end?: string;
  code: string;
  status: ServiceOrderStatusEnum;
  adress: string,
  description: string;
  document_list: IServiceOrderDocument[];
}
