import {Component, effect, inject, input, InputSignal, model, ModelSignal} from '@angular/core';
import {FileTransferService, ROUTE_FILE_SEND} from '../../../shared/services/file-transfer';
import {IServiceOrderItemDocument} from '../../../shared/interfaces/IServiceOrderItemDocument';
import {takeUntil} from 'rxjs';
import {ToastService} from '../../../shared/services/toast';

@Component({
  selector: 'app-service-order-images',
  imports: [],
  templateUrl: './service-order-images.html',
  styleUrl: './service-order-images.scss'
})
export class ServiceOrderImages {
  public soItemId: InputSignal<number> = input.required();
  public photoList: ModelSignal<IServiceOrderItemDocument[]> = model<IServiceOrderItemDocument[]>([]);
  public inputFileId: InputSignal<string> = input('inputFileImages');

  private readonly _fileTransfer: FileTransferService = inject(FileTransferService);
  private readonly _toast: ToastService = inject(ToastService);
  private _filesToSend: File[] = [];
  public imgsUrls: string[] = [];
  public showGalery: boolean = false;
  public indexGalery: number = 0;

  constructor() {
    effect(() => {
      this.setImageUrlList(this.photoList());
    });
  }

  private processResponse(req: Promise<IServiceOrderItemDocument>): void {
    req.then((res: IServiceOrderItemDocument) => {
      this.photoList().push(res);
    }).catch(() => {
      this._toast.showToastError("Erro ao adicionar imagem!");
    });
  }

  private saveImage(): void {
    const auxFiles = [...this._filesToSend];
    this._filesToSend = [];
    for (let file of auxFiles) {
      const transfer = this._fileTransfer.uploadFile(this.getFormData(file), ROUTE_FILE_SEND);
      this.processResponse(transfer.request);

      transfer.retryEvent.pipe(takeUntil(transfer.destroy$)).subscribe({
        next: (req: Promise<IServiceOrderItemDocument>) => {
          this.processResponse(req);
        }
      });
    }

    this.setImageUrlList(this.photoList());
  }

  private getFormData(file: File): FormData {
    const formData: FormData = new FormData();
    formData.append("sevice_order_item_id", `${this.soItemId()}`);
    formData.append("name", `servico_foto_${this.soItemId()}`);
    formData.append("file", file);
    return formData;
  }

  private setImageUrlList(photoList: IServiceOrderItemDocument[]): void {
    this.imgsUrls = [];
    this.photoList().forEach((image: IServiceOrderItemDocument) => {
      this.imgsUrls.push(image.document.path);
    });
  }

  public toggleGallery(index: number): void {
    this.indexGalery = index;
    this.showGalery = !this.showGalery;
  }

  public onChangeInputFile(event: any): void {
    for (let file of event.target.files) {
      this._filesToSend.push(file);
    }

    if (this._filesToSend.length > 0) this.saveImage();
  }

  public getFakeList(): number[] {
    const missingItems = 2 - this.photoList().length;
    return missingItems > 0 ? Array.from({length: missingItems}, (_, i) => i + 1) : [];
  }
}
