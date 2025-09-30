import { Component } from '@angular/core';
import {MenuDesktop} from '../menu-desktop/menu-desktop';
import {toggleMenu} from '../../../shared/utils/menu-utils';

@Component({
  selector: 'app-menu-mobile',
  imports: [
    MenuDesktop
  ],
  templateUrl: './menu-mobile.html',
  styleUrl: './menu-mobile.scss'
})
export class MenuMobile {

  public closeMenu(): void {
    toggleMenu();
  }
}
