import {ServiceOrderStatusEnum} from '../enums/ServiceOrderStatusEnum';
import {IMetaData} from './IMetaData';
import {IServiceOrderDocument} from './IServiceOrderDocument';
import {IClient} from './IClient';
import {IServiceOrderItem} from './IServiceOrderItem';

export interface IServiceOrder extends IMetaData {
  id?: number;
  client_id?: number;
  contract_id?: number;
  start_date?: Date;
  end_date?: Date;
  code: string;
  status: ServiceOrderStatusEnum;
  address: string,
  description: string;
  client: IClient,
  document_list: IServiceOrderDocument[];
  items: IServiceOrderItem[]
}
