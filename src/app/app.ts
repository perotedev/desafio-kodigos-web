import {afterNextRender, Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppTheme} from './shared/services/app-theme';

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
