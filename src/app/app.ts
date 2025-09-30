import {afterNextRender, Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppTheme} from './shared/services/app-theme';
import localePt from '@angular/common/locales/pt'
import {registerLocaleData} from '@angular/common';

registerLocaleData(localePt)

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly _theme: AppTheme = inject(AppTheme);

  constructor() {
    afterNextRender(() => {
      this._theme.setTheme();
    })
  }
}
