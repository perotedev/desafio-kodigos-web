import {afterNextRender, Component, inject, Signal, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppTheme} from './shared/services/app-theme';
import {Toast} from 'primeng/toast';
import {NgxUiLoaderModule, NgxUiLoaderService} from 'ngx-ui-loader';
import {Loading} from './shared/services/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, NgxUiLoaderModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly _theme: AppTheme = inject(AppTheme);
  private readonly _loading = inject(Loading);

  public isLoading: Signal<boolean> = this._loading.isLoading;

  constructor() {
    afterNextRender(() => {
      this._theme.setTheme();
    })
  }
}
