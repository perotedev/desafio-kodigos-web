import {inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class Loading {
  private _isLoading: WritableSignal<boolean> = signal(false);
  private _loader: NgxUiLoaderService = inject(NgxUiLoaderService);

  get isLoading(): Signal<boolean> {
    return this._isLoading;
  }

  public present(): void {
    this._isLoading.set(true);
    this._loader.start();
  }

  public dismiss(): void {
    this._isLoading.set(false);
    this._loader.stop();
  }
}
