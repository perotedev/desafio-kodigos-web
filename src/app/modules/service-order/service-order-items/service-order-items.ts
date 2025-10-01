import {Component, inject, input, InputSignal} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {IServiceOrderItem} from '../../../shared/interfaces/IServiceOrderItem';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {ServiceOrderItemForm} from '../service-order-item-form/service-order-item-form';
import {IServiceType} from '../../../shared/interfaces/IServiceType';

@Component({
  selector: 'app-service-order-items',
  imports: [
    Button,
    Dialog,
    ServiceOrderItemForm
  ],
  templateUrl: './service-order-items.html',
  styleUrl: './service-order-items.scss'
})
export class ServiceOrderItems {
  public soId: InputSignal<number> = input.required();
  public serviceTypes: InputSignal<IServiceType[]> = input.required();
  public canAddItems: InputSignal<boolean> = input(false);

  public readonly isMobile = inject(IS_MOBILE);
  public showDialog: boolean = false;
  public currentItem?: IServiceOrderItem;

  public toggleDialog(item?: IServiceOrderItem): void {
    this.currentItem = item;
    this.showDialog = !this.showDialog;
  }
}
