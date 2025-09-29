import {Injectable, Signal, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Loading {
  private _isLoading: WritableSignal<boolean> = signal(false);

  get isLoading(): Signal<boolean> {
    return this._isLoading;
  }

  public present(): void {
    this._isLoading.set(true);
  }

  public dismiss(): void {
    this._isLoading.set(false);
  }
}
