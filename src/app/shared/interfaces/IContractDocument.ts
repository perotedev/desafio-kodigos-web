import {IDocument} from './IDocument';

export interface IContractDocument {
  id?: number;
  contract_id: number;
  document_id: number;
  document: IDocument
}
