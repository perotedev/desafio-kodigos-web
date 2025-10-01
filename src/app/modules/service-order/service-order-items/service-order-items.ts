import {Component, inject, input, InputSignal, OnInit} from '@angular/core';
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
  public soId: InputSignal<number> = input.required();
  public serviceTypes: InputSignal<IServiceType[]> = input.required();
  public canAddItems: InputSignal<boolean> = input(false);

  private readonly _soService: ServiceOrderService = inject(ServiceOrderService);
  private readonly _toast: ToastService = inject(ToastService);
  public readonly isMobile = inject(IS_MOBILE);
  public showDialog: boolean = false;
  public currentItem?: IServiceOrderItem;
  public isLoadingItems: boolean = false;
  public items: IServiceOrderItem[] = [];

  private getItems(): void {
    this.isLoadingItems = true;
    this._soService.getServiceOrderItems(this.soId())
      .then((res: IServiceOrderItem[]) => {
        this.items = res;
      }).catch((err: any) => {
        this._toast.showToastError("Erro ao listar serviços da OS");
      }).finally(() => this.isLoadingItems = false);
  }

  public ngOnInit(): void {
    if (this.soId()) {
      this.getItems();
    }
  }

  public onSaveItem(item: IServiceOrderItem): void {
    this.toggleDialog();

    const existingItemIndex: number = this.items.findIndex((i: IServiceOrderItem) => i.id === item.id);
    if (existingItemIndex >= 0) {
      this.items[existingItemIndex] = item;
    } else {
      this.items.push(item);
    }
  }

  public onEditItem(index: number): void {
    this.toggleDialog(this.items[index]);
  }

  public removeItem(index: number): void {

  }

  public toggleDialog(item?: IServiceOrderItem): void {
    this.currentItem = item;
    this.showDialog = !this.showDialog;
  }
}
