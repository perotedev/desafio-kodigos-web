import {Component, inject, signal, WritableSignal} from '@angular/core';
import {DatePipe} from "@angular/common";
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {IServiceOrder} from '../../../shared/interfaces/IServiceOrder';
import {ServiceOrderStatusEnum} from '../../../shared/enums/ServiceOrderStatusEnum';
import {IServiceOrderItem} from '../../../shared/interfaces/IServiceOrderItem';
import {ServiceOrderItems} from '../service-order-items/service-order-items';
import {IServiceType} from '../../../shared/interfaces/IServiceType';
import {ServiceOrderItemDetails} from '../service-order-item-details/service-order-item-details';
import {Dialog} from 'primeng/dialog';
import {ServiceOrderForm} from '../service-order-form/service-order-form';
import {ServiceOrderItemForm} from '../service-order-item-form/service-order-item-form';

@Component({
  selector: 'app-service-order-details',
  imports: [
    DatePipe,
    ServiceOrderItems,
    ServiceOrderItemDetails,
    Dialog,
    ServiceOrderForm,
    ServiceOrderItemForm
  ],
  templateUrl: './service-order-details.html',
  styleUrl: './service-order-details.scss'
})
export class ServiceOrderDetails {
  public readonly isMobile = inject(IS_MOBILE);
  public serviceOrder?: IServiceOrder = {
    id: 1,
    code: "323-YDF/00",
    client_id: 1,
    description: "Manutenção preventiva em equipamentos de climatização",
    date_start: new Date('2024-01-15'),
    date_end: new Date('2024-01-20'),
    document_list: [],
    contract_id: 1,
    client: {
      name: "Tech Inovation and Solutions LTDA",
      adress_id: 1,
      adress: {
        street: "Avenida Brasil",
        number: "1500",
        neighborhood: "Centro",
        state: "SP",
        city: "São Paulo",
        cep: "01234-567",
        complement: "Sala 505"
      },
      phone: "(11) 98765-4321",
      email: "contato@techsolutions.com.br",
      contracts: []
    },
    status: ServiceOrderStatusEnum.FINISHED,
    adress: "Avenida Brasil, 1500 - Centro, São Paulo/SP",
    createdAt: new Date('2024-01-15')
  }

  public readonly soItemList: WritableSignal<IServiceOrderItem[]> = signal([]);
  public showDialog: boolean = false;
  public showDialogItem: boolean = false;
  public currentSoItem?: IServiceOrderItem;
  public serviceTypes: IServiceType[] = [];

  public onSelectItem(index: number): void {
    this.currentSoItem = {...this.soItemList()[index]};
  }

  public onSaveItem(item: IServiceOrderItem): void {
    this.toggleDialogItem();

    const existingItemIndex: number = this.soItemList().findIndex((i: IServiceOrderItem) => i.id === item.id);
    if (existingItemIndex >= 0) {
      this.soItemList()[existingItemIndex] = item;
    }
  }

  public toggleDialog(): void {
    this.showDialog = !this.showDialog;
  }

  public toggleDialogItem(): void {
    this.showDialogItem = !this.showDialogItem;
  }
}
