import {IDocument} from './IDocument';

export interface IServiceOrderDocument {
  id?: number;
  service_order_id: number;
  document_id: number;
  document: IDocument;
}
