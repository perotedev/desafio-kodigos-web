import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {TabsModule} from 'primeng/tabs';
import {ServiceOrderDetails} from '../service-order-details/service-order-details';
import {ServiceOrderFiles} from '../service-order-files/service-order-files';
import {ActivatedRoute} from '@angular/router';
import {ServiceOrderService} from '../service-order-service';
import {Loading} from '../../../shared/services/loading';
import {ToastService} from '../../../shared/services/toast';
import {IServiceOrder} from '../../../shared/interfaces/IServiceOrder';
import {IServiceType} from '../../../shared/interfaces/IServiceType';
import {IPaginationResponse} from '../../../shared/interfaces/IPaginationResponse';

@Component({
  selector: 'app-service-order-view',
  imports: [
    TabsModule,
    ServiceOrderDetails,
    ServiceOrderFiles
  ],
  templateUrl: './service-order-view.html',
  styleUrl: './service-order-view.scss'
})
export class ServiceOrderView implements OnInit {
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _serviceOrderService: ServiceOrderService = inject(ServiceOrderService);
  private readonly _loading: Loading = inject(Loading);
  private readonly _toast: ToastService = inject(ToastService);

  public readonly serviceTypes: WritableSignal<IServiceType[]> = signal([])
  public tabIndex: string = "0";
  public soId: number = 0;
  public serviceOrder: WritableSignal<IServiceOrder | undefined> = signal(undefined);

  constructor() {
    this.soId = this._activatedRoute.snapshot.params['id'];
  }

  private getServiceOrder(): void {
    this._loading.present();
    this._serviceOrderService.getServiceOrder(this.soId)
      .then((res: IServiceOrder) => {
        this.serviceOrder.set(res);
      }).catch(err => {
        this._toast.showToastError("Erro ao buscar dados da orderm de serviço");
      }).finally(() => this._loading.dismiss());
  }

  public getServiceTypes(): void {
    this._serviceOrderService.getServiceTypes(1, 100, "")
      .then((res: IPaginationResponse<IServiceType>) => {
        this.serviceTypes.set(res.items);
      }).catch(err => {
        this._toast.showToastError("Erro ao listar tipos de serviço!");
    })
  }

  public ngOnInit(): void {
    this.getServiceOrder();
    this.getServiceTypes();
  }
}
