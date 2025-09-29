import {Injectable, InjectionToken, Signal, signal, WritableSignal} from '@angular/core';
import {IUserConfig} from '../interfaces/IUserConfig';

export const IS_DARK_MODE = new InjectionToken<boolean>('IS_DARK_MODE');

export const APP_THEME: string = "appTheme";
export const MENU_EXPANDED: string = "appExpanded";
export type ThemeType = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class AppTheme {
  private readonly _isDarkMode: WritableSignal<boolean> = signal(false);

  get isDarkMode(): Signal<boolean> {
    return this._isDarkMode;
  }

  private toggleTheme(theme: ThemeType): void {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark-mode');
      this._isDarkMode.set(true);
    } else {
      htmlElement.classList.remove('dark-mode');
      this._isDarkMode.set(false);
    }
  }

  public setConfig(data?: IUserConfig): void {
    if (data) {
      localStorage.setItem(APP_THEME, data.theme ?? 'light');
      localStorage.setItem(MENU_EXPANDED, String(data.expanded ?? true));
    }
  }

  public setTheme(theme?: ThemeType): void {
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    this.toggleTheme(theme);
  }
}
