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
  public soId: InputSignal<number> = input.required();
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

  private getItems(): void {
    this.isLoadingItems = true;
    this._soService.getServiceOrderItems(this.soId())
      .then((res: IServiceOrderItem[]) => {
        this.items.set(res);
      }).catch((err: any) => {
        this._toast.showToastError("Erro ao listar serviços da OS");
      }).finally(() => this.isLoadingItems = false);
  }

  public ngOnInit(): void {
    this.items.set([
      {
        status: ServiceOrderStatusEnum.PENDING,
        service_type_id: 0,
        service_order_id: 0,
        service_type: {
          description: "Serviços de Manutenção Elétrica",
          name: "Manutenção Elétrica",
          icon: "pi-bolt",
        },
        description: "Troca de Pilhas de Ponta de Acesso",
        notes: "As Baterias foram trocadas com sucesso.",
        document_list: []
      },
      {
        status: ServiceOrderStatusEnum.IN_PROGRESS,
        service_type_id: 1,
        service_order_id: 1,
        service_type: {
          description: "Serviços de Limpeza",
          name: "Limpeza",
          icon: "pi-trash",
        },
        description: "Limpeza das Áreas Comuns",
        notes: "Limpeza realizada conforme cronograma.",
        document_list: []
      },
      {
        status: ServiceOrderStatusEnum.FINISHED,
        service_type_id: 2,
        service_order_id: 2,
        service_type: {
          description: "Serviços de Pintura",
          name: "Pintura",
          icon: "pi-palette",
        },
        description: "Pintura da Fachada",
        notes: "",
        document_list: []
      },
      {
        status: ServiceOrderStatusEnum.PENDING,
        service_type_id: 3,
        service_order_id: 3,
        service_type: {
          description: "Serviços Hidráulicos",
          name: "Hidráulica",
          icon: "pi-wrench",
        },
        description: "Reparo de Vazamento",
        notes: "Vazamento identificado na tubulação principal.",
        document_list: []
      },
      {
        status: ServiceOrderStatusEnum.CANCELED,
        service_type_id: 4,
        service_order_id: 4,
        service_type: {
          description: "Serviços de Jardinagem",
          name: "Jardinagem",
          icon: "pi-leaf",
        },
        description: "Poda de Árvores",
        notes: "Serviço cancelado devido às condições climáticas.",
        document_list: []
      },
      {
        status: ServiceOrderStatusEnum.IN_PROGRESS,
        service_type_id: 5,
        service_order_id: 5,
        service_type: {
          description: "Serviços de Segurança",
          name: "Segurança",
          icon: "pi-shield",
        },
        description: "Instalação de Câmeras",
        notes: "Instalação em andamento no setor norte.",
        document_list: []
      }
    ]);

    if (this.soId()) {
      this.getItems();
    }
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
