import {Component} from '@angular/core';
import {TabsModule} from 'primeng/tabs';
import {ServiceOrderDetails} from '../service-order-details/service-order-details';
import {ServiceOrderFiles} from '../service-order-files/service-order-files';

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
export class ServiceOrderView {
  public tabIndex: string = "0";
}
