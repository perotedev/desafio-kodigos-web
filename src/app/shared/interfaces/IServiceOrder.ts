import {ServiceOrderStatusEnum} from '../enums/ServiceOrderStatusEnum';
import {IMetaData} from './IMetaData';
import {IServiceOrderDocument} from './IServiceOrderDocument';
import {IClient} from './IClient';

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
  client: IClient,
  document_list: IServiceOrderDocument[];
}
