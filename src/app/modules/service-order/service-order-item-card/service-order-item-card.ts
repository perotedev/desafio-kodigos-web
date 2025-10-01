import {Component, inject, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {Button} from 'primeng/button';
import {MenuItem} from 'primeng/api';
import {Menu} from 'primeng/menu';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {IServiceOrderItem} from '../../../shared/interfaces/IServiceOrderItem';

@Component({
  selector: 'app-service-order-item-card',
  imports: [
    Button,
    Menu
  ],
  templateUrl: './service-order-item-card.html',
  styleUrl: './service-order-item-card.scss'
})
export class ServiceOrderItemCard {
  public index: InputSignal<number> = input(1);
  public soItem: InputSignal<IServiceOrderItem> = input.required();
  public onEditItem: OutputEmitterRef<void> = output();
  public onDeleteItem: OutputEmitterRef<void> = output();

  public readonly isMobile = inject(IS_MOBILE);
}
