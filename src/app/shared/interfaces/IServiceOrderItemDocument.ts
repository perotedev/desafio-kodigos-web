import {IDocument} from './IDocument';

export interface IServiceOrderItemDocument {
  id?: number;
  service_order_item_id: number;
  document_id: number;
  document: IDocument;
}
