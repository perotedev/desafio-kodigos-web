import {Component, inject, ViewChild} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Stepper, StepperModule} from 'primeng/stepper';
import {ServiceOrderForm} from '../service-order-form/service-order-form';
import {ServiceOrderItems} from '../service-order-items/service-order-items';
import {IServiceOrder} from '../../../shared/interfaces/IServiceOrder';
import {IServiceType} from '../../../shared/interfaces/IServiceType';
import {RouterLink} from '@angular/router';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {ServiceOrderFiles} from '../service-order-files/service-order-files';

@Component({
  selector: 'app-service-order-create',
  imports: [StepperModule, ButtonModule, ServiceOrderForm, ServiceOrderItems, RouterLink, ServiceOrderFiles],
  templateUrl: './service-order-create.html',
  styleUrl: './service-order-create.scss'
})
export class ServiceOrderCreate {
  public readonly isMobile = inject(IS_MOBILE);
  public stepperValue: number = 1;
  @ViewChild('stepper') stepper: Stepper | undefined;
  public createdSo?: IServiceOrder;
  public serviceTypes: IServiceType[] = [];

  public goToStep(index: number): void {
    this.stepperValue = index;
  }
}
