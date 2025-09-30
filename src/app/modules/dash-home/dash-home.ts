import { Component } from '@angular/core';
import {ListItens} from '../../shared/components/list-itens/list-itens';
import {ContainerContent} from '../../shared/components/container-content/container-content';

@Component({
  selector: 'app-dash-home',
  imports: [
    ListItens,
    ContainerContent
  ],
  templateUrl: './dash-home.html',
  styleUrl: './dash-home.scss'
})
export class DashHome {

}
