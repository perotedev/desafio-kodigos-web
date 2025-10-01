import { Component } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {StepperModule} from 'primeng/stepper';
import {ServiceOrderForm} from '../service-order-form/service-order-form';
import {ServiceOrderItems} from '../service-order-items/service-order-items';
import {ServiceOrderImages} from '../service-order-images/service-order-images';
import {IServiceOrder} from '../../../shared/interfaces/IServiceOrder';
import {IServiceType} from '../../../shared/interfaces/IServiceType';

@Component({
  selector: 'app-service-order-create',
  imports: [StepperModule, ButtonModule, ServiceOrderForm, ServiceOrderItems, ServiceOrderImages],
  templateUrl: './service-order-create.html',
  styleUrl: './service-order-create.scss'
})
export class ServiceOrderCreate {
  public createdSo?: IServiceOrder;
  public serviceTypes: IServiceType[] = [];
}
