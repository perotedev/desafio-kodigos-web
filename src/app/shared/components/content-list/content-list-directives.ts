import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
  TemplateRef
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[cl-header]'
})
export class ClHeaderDirective implements OnInit {
  public elementRef: ElementRef<any> = inject(ElementRef);
  public style: InputSignal<string> = input("");
  public hIcon: InputSignal<string | undefined> = input();
  public autoCol: InputSignal<boolean> = input(true);
  public classList: string = "";

  public ngOnInit(): void {
    if (this.elementRef) {
      if (this.autoCol())  {
        this.classList = 'col';
      }
      this.classList += ` ${this.elementRef.nativeElement.classList.toString()}`;
    }
  }
}

@Directive({
  standalone: true,
  selector: '[cl-cell]'
})
export class ClCellDirective implements OnInit {
  public elementRef: ElementRef<any> = inject(ElementRef);
  public autoCol: InputSignal<boolean> = input(true);
  public ellipsis: InputSignal<boolean> = input(true);

  public ngOnInit(): void {
    if (this.elementRef) {
      this.elementRef.nativeElement.classList.add("pf-cell");
      if (this.autoCol()) this.elementRef.nativeElement.classList.add('col');
      if (this.ellipsis()) this.elementRef.nativeElement.classList.add('cell-ellipsis');
    }

  }
}

@Directive({
  standalone: true,
  selector: '[clTCell]'
})
export class ClCellTemplateDirective {
  public template: TemplateRef<any> = inject(TemplateRef);
  public mobileHiden: InputSignal<boolean> = input(false);
  public isAction: InputSignal<boolean> = input(false);
  public mobileDisplay: Signal<boolean> = computed(() => !this.isAction() && !this.mobileHiden());
}

@Directive({
  standalone: true,
  selector: '[clTEmpty]'
})
export class ClEmptyTemplateDirective {
  public template: TemplateRef<any> = inject(TemplateRef);
}
