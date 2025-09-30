import {Component, inject} from '@angular/core';
import {AppTheme, IS_DARK_MODE} from '../../../shared/services/app-theme';

@Component({
  selector: 'app-header-bar-home',
  imports: [],
  templateUrl: './header-bar-home.html',
  styleUrl: './header-bar-home.scss'
})
export class HeaderBarHome {
  private readonly _themeService: AppTheme = inject(AppTheme);
  public readonly isDarkMode = inject(IS_DARK_MODE);

  public toggleTheme(): void {
    this._themeService.setTheme(this.isDarkMode()?'light':'dark');
  }
}
