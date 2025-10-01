import {Component, inject} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {StepperModule} from 'primeng/stepper';
import {ServiceOrderForm} from '../service-order-form/service-order-form';
import {ServiceOrderItems} from '../service-order-items/service-order-items';
import {ServiceOrderImages} from '../service-order-images/service-order-images';
import {IServiceOrder} from '../../../shared/interfaces/IServiceOrder';
import {IServiceType} from '../../../shared/interfaces/IServiceType';
import {RouterLink} from '@angular/router';
import {IS_MOBILE} from '../../../shared/services/is-mobile';

@Component({
  selector: 'app-service-order-create',
  imports: [StepperModule, ButtonModule, ServiceOrderForm, ServiceOrderItems, ServiceOrderImages, RouterLink],
  templateUrl: './service-order-create.html',
  styleUrl: './service-order-create.scss'
})
export class ServiceOrderCreate {
  public readonly isMobile = inject(IS_MOBILE);
  public createdSo?: IServiceOrder;
  public serviceTypes: IServiceType[] = [];
}
