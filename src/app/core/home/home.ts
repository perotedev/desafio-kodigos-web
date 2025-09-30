import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FileTransfer} from '../../shared/components/file-transfer/file-transfer';
import {LoadingComponent} from '../../shared/components/loading-component/loading-component';
import {IS_MOBILE} from '../../shared/services/is-mobile';
import {MenuMobile} from '../menu/menu-mobile/menu-mobile';
import {MenuDesktop} from '../menu/menu-desktop/menu-desktop';
import {HeaderBarHome} from '../header-bar/header-bar-home/header-bar-home';
import {Breadcrumb} from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, FileTransfer, LoadingComponent, MenuMobile, MenuDesktop, HeaderBarHome, Breadcrumb],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public readonly isMobile = inject(IS_MOBILE);
}
