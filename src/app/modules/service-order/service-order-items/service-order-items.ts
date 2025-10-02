import {
  Component,
  inject,
  input,
  InputSignal,
  model,
  ModelSignal,
  OnInit,
  output,
  OutputEmitterRef
} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {IServiceOrderItem} from '../../../shared/interfaces/IServiceOrderItem';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {ServiceOrderItemForm} from '../service-order-item-form/service-order-item-form';
import {IServiceType} from '../../../shared/interfaces/IServiceType';
import {ServiceOrderService} from '../service-order-service';
import {ToastService} from '../../../shared/services/toast';
import {ServiceOrderItemCard} from '../service-order-item-card/service-order-item-card';
import {Message} from 'primeng/message';
import {ServiceOrderStatusEnum} from '../../../shared/enums/ServiceOrderStatusEnum';

@Component({
  selector: 'app-service-order-items',
  imports: [
    Button,
    Dialog,
    ServiceOrderItemForm,
    ServiceOrderItemCard,
    Message
  ],
  templateUrl: './service-order-items.html',
  styleUrl: './service-order-items.scss'
})
export class ServiceOrderItems implements OnInit {
  public soId: InputSignal<number | undefined> = input<number | undefined>(undefined);
  public serviceTypes: InputSignal<IServiceType[]> = input.required();
  public canAddItems: InputSignal<boolean> = input(false);
  public isDetails: InputSignal<boolean> = input(false);
  public items: ModelSignal<IServiceOrderItem[]> = model<IServiceOrderItem[]>([]);
  public onSelect: OutputEmitterRef<number> = output();

  private readonly _soService: ServiceOrderService = inject(ServiceOrderService);
  private readonly _toast: ToastService = inject(ToastService);
  public readonly isMobile = inject(IS_MOBILE);
  public showDialog: boolean = false;
  public currentItem?: IServiceOrderItem;
  public indexSelected: number = -1;
  public isLoadingItems: boolean = false;

  private getItems(serviceOderId: number): void {
    this.isLoadingItems = true;
    this._soService.getServiceOrderItems(serviceOderId)
      .then((res: IServiceOrderItem[]) => {
        this.items.set(res);
      }).catch((err: any) => {
        this._toast.showToastError("Erro ao listar serviços da OS");
      }).finally(() => this.isLoadingItems = false);
  }

  public ngOnInit(): void {
    // if (this.soId()) {
    //   this.getItems(this.soId()!);
    // }
  }

  public onSaveItem(item: IServiceOrderItem): void {
    this.toggleDialog();

    const existingItemIndex: number = this.items().findIndex((i: IServiceOrderItem) => i.id === item.id);
    if (existingItemIndex >= 0) {
      this.items()[existingItemIndex] = item;
    } else {
      this.items().push(item);
    }
  }

  public onSelectItem(index: number): void {
    this.indexSelected = index;
    this.onSelect.emit(index);
  }

  public onEditItem(index: number): void {
    this.toggleDialog(this.items()[index]);
  }

  public removeItem(index: number): void {

  }

  public toggleDialog(item?: IServiceOrderItem): void {
    this.currentItem = item;
    this.showDialog = !this.showDialog;
  }
}
