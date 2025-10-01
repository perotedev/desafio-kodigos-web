import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-service-order-items',
  imports: [
    Button,
    Dialog
  ],
  templateUrl: './service-order-items.html',
  styleUrl: './service-order-items.scss'
})
export class ServiceOrderItems {

}
