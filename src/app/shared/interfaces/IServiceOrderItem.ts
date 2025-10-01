import {ServiceOrderStatusEnum} from '../enums/ServiceOrderStatusEnum';
import {IServiceOrderItemDocument} from './IServiceOrderItemDocument';

export interface IServiceOrderItem {
  id?: number;
  service_order_id: number;
  service_type_id: number;
  description: string;
  status: ServiceOrderStatusEnum;
  document_list: IServiceOrderItemDocument[];
}
