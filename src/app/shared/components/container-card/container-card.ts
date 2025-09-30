import {Component, input, InputSignal} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-container-card',
  imports: [
    NgStyle
  ],
  templateUrl: './container-card.html',
  styleUrl: './container-card.scss'
})
export class ContainerCard {
  public cWidth: InputSignal<string> = input('auto');
  public cHeight: InputSignal<string> = input('auto');
}
