import {Component, computed, inject, model, ModelSignal, Signal} from '@angular/core';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import pkg from '../../../../../package.json';
import {environment} from '../../../../environments/environment';
import {IMenuItem, MenuItem} from '../menu-item/menu-item';
import {CURRENT_USER} from '../../../shared/services/current-user';
import {RoleEnum} from '../../../shared/enums/RoleEnum';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

const version = pkg.version;

@Component({
  selector: 'app-menu-desktop',
  imports: [
    MenuItem,
    Button,
    RouterLink
  ],
  templateUrl: './menu-desktop.html',
  styleUrl: './menu-desktop.scss'
})
export class MenuDesktop {
  public expanded: ModelSignal<boolean> = model(false);

  private readonly _currentUser = inject(CURRENT_USER);
  public readonly isMobile = inject(IS_MOBILE);

  public readonly appVersion = version;
  public readonly appName = environment.appName;

  private readonly _menuItems: IMenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      route: '/',
      roles: []
    },
    {
      label: 'Ordens de Serviço',
      icon: 'pi pi-list',
      route: '/service-order',
      roles: []
    },
    {
      label: 'Usuários',
      icon: 'pi pi-user',
      route: '/user',
      // roles: [RoleEnum.ADMIN]
      roles: []
    }
  ]
  public menuItems: Signal<IMenuItem[]> = computed(() => {
    return this._menuItems
      .filter((item: IMenuItem) => item.roles.length === 0 || item.roles.includes(this._currentUser().role));
  });

  public toggleMenu(): void {
    if (!this.isMobile()) {
      this.expanded.set(!this.expanded());
    }
  }
}
