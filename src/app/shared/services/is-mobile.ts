import {computed, Injectable, InjectionToken, Signal} from '@angular/core';
import {fromEvent, map, Observable, startWith} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

export const IS_MOBILE = new InjectionToken<Signal<boolean>>('IS_MOBILE');

@Injectable({
  providedIn: 'root'
})
export class IsMobile {
  private readonly resize$: Observable<number> = fromEvent(window, 'resize').pipe(
    startWith(null),
    map(() => window.innerWidth)
  );
  private readonly _windowWidth: Signal<number> = toSignal(this.resize$, {initialValue: 0});
  private readonly _isMobile: Signal<boolean> = computed(() => this.checkIsMobile(this._windowWidth()));

  constructor() {}

  get isMobile(): Signal<boolean> {
    return this._isMobile;
  }

  private checkIsMobile(width: number): boolean {
    if (width === 0) return false;

    const userAgent: string = navigator.userAgent.toLowerCase();
    const isMobileDevice: boolean = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

    return (width < 800) || isMobileDevice;
  }
}
