import {inject, Injectable, Signal, signal, TemplateRef, WritableSignal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderBarService {
  private readonly _templateBefore: WritableSignal<TemplateRef<any> | null> = signal(null);
  private readonly _templateAfter: WritableSignal<TemplateRef<any> | null> = signal(null);
  private readonly _router: Router = inject(Router);

  constructor() {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.clearAllTemplates();
      }
    });
  }

  get templateBefore(): Signal<TemplateRef<any> | null> {
    return this._templateBefore;
  }

  get templateAfter(): Signal<TemplateRef<any> | null> {
    return this._templateAfter;
  }

  public setTemplateBefore(template: TemplateRef<any> | null): void {
    this._templateBefore.set(template);

  }

  public clearTemplateBefore(): void {
    this._templateBefore.set(null);
  }

  public setTemplatAfter(template: TemplateRef<any> | null): void {
    this._templateAfter.set(template);

  }

  public clearTemplateAfter(): void {
    this._templateAfter.set(null);
  }

  public clearAllTemplates(): void {
    this.clearTemplateBefore();
    this.clearTemplateAfter();
  }
}
