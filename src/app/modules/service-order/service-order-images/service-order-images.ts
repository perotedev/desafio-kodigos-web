import {Component, effect, inject, input, InputSignal, model, ModelSignal} from '@angular/core';
import {Loading} from '../../../shared/services/loading';
import {FileTransferService} from '../../../shared/services/file-transfer';
import {IServiceOrderItemDocument} from '../../../shared/interfaces/IServiceOrderItemDocument';
import {takeUntil} from 'rxjs';

@Component({
  selector: 'app-service-order-images',
  imports: [],
  templateUrl: './service-order-images.html',
  styleUrl: './service-order-images.scss'
})
export class ServiceOrderImages {
  public soItemId: InputSignal<number> = input.required();
  public photoList: ModelSignal<IServiceOrderItemDocument[]> = model<IServiceOrderItemDocument[]>([]);

  private readonly _fileTransfer: FileTransferService = inject(FileTransferService);
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
    });
  }

  private saveImage(): void {
    for (let file of this._filesToSend) {

      const transfer = this._fileTransfer.uploadFile(this.getFormData(file), "");
      this.processResponse(transfer.request);

      transfer.retryEvent.pipe(takeUntil(transfer.destroy$)).subscribe({
        next: (req: Promise<any>) => {
          this.processResponse(req);
        }
      });
    }

    this.setImageUrlList(this.photoList());
    this._filesToSend = [];
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
    const missingItems = 5 - this.photoList().length;
    return missingItems > 0 ? Array(missingItems).fill(0) : [];
  }
}
