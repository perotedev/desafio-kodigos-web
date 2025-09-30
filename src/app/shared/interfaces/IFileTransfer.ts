import {Subject} from "rxjs";

export type FileTransferType = 'upload' | 'download';
export interface IFileTransfer {
  loading: boolean;
  progress: number;
  error?: string;
  transferType: FileTransferType;
  url: string;
  body?: any;
  destroy$: Subject<void>;
  icon: string;
  httpMethod: 'post' | 'get';
  request: Promise<any>;
  retryEvent: Subject<Promise<any>>;
  fileName: string;
  blob?: Blob;
}
export interface IFileTransferList {
  hasTransfers: boolean;
  finishTransfer: boolean;
  transfers: IFileTransfer[];
}
