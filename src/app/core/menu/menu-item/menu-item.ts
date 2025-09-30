import {Component, input, InputSignal} from '@angular/core';
import {RoleEnum} from '../../../shared/enums/RoleEnum';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

export interface IMenuItem {
  label: string;
  icon: string;
  isIconAsset?: boolean;
  route: string;
  roles: string[];
}

@Component({
  selector: 'app-menu-item',
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss'
})
export class MenuItem {
  public item: InputSignal<IMenuItem> = input.required();
  public active: InputSignal<boolean> = input(false);
  public expanded: InputSignal<boolean> = input(true);
}
