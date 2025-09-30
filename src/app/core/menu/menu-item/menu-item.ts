import {Component, input, InputSignal} from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Tooltip} from 'primeng/tooltip';
import {toggleMenu} from '../../../shared/utils/menu-utils';

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
    RouterLink,
    Tooltip
  ],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss'
})
export class MenuItem {
  public item: InputSignal<IMenuItem> = input.required();
  public active: InputSignal<boolean> = input(false);
  public expanded: InputSignal<boolean> = input(true);
  public isMobile: InputSignal<boolean> = input(false);

  public onClick(): void {
    if (this.isMobile()) {
      toggleMenu();
    }
  }
}
