import {Component, inject, Signal, TemplateRef} from '@angular/core';
import {AppTheme, IS_DARK_MODE} from '../../../shared/services/app-theme';
import {CommonModule} from '@angular/common';
import {Button} from 'primeng/button';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import pkg from '../../../../../package.json';
import {environment} from '../../../../environments/environment';
import {HeaderBarService} from '../header-bar-service';
import {toggleMenu} from '../../../shared/utils/menu-utils';
import {AuthService} from '../../auth/auth-service';

const version = pkg.version;

@Component({
  selector: 'app-header-bar-home',
  imports: [CommonModule, Button],
  templateUrl: './header-bar-home.html',
  styleUrl: './header-bar-home.scss'
})
export class HeaderBarHome {
  private readonly _headerBarService: HeaderBarService = inject(HeaderBarService);
  private readonly _themeService: AppTheme = inject(AppTheme);
  private readonly _authService: AuthService = inject(AuthService);
  public readonly isDarkMode = inject(IS_DARK_MODE);
  public readonly isMobile = inject(IS_MOBILE);
  public readonly today: Date = new Date();
  public readonly appVersion: string = version;
  public readonly appName: string = environment.appName;
  public readonly templateBefore: Signal<TemplateRef<any>|null> = this._headerBarService.templateBefore;
  public readonly templateAfter: Signal<TemplateRef<any>|null> = this._headerBarService.templateAfter;

  public toggleTheme(): void {
    this._themeService.setTheme(this.isDarkMode()?'light':'dark');
  }

  public expandMenu(): void {
    toggleMenu();
  }

  public logout(): void {
    this._authService.logout();
  }
}
