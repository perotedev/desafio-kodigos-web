import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FileTransfer} from '../../shared/components/file-transfer/file-transfer';
import {LoadingComponent} from '../../shared/components/loading-component/loading-component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, FileTransfer, LoadingComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
