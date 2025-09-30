import {Component, model, ModelSignal} from '@angular/core';

@Component({
  selector: 'app-menu-desktop',
  imports: [],
  templateUrl: './menu-desktop.html',
  styleUrl: './menu-desktop.scss'
})
export class MenuDesktop {
  public expanded: ModelSignal<boolean> = model(false);
}
