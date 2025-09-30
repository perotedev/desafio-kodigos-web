import { Component } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {StepperModule} from 'primeng/stepper';
import {ServiceOrderForm} from '../service-order-form/service-order-form';

@Component({
  selector: 'app-service-order-create',
  imports: [StepperModule, ButtonModule, ServiceOrderForm],
  templateUrl: './service-order-create.html',
  styleUrl: './service-order-create.scss'
})
export class ServiceOrderCreate {

}
