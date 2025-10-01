import {Component, input, InputSignal} from '@angular/core';

@Component({
  selector: 'app-dash-card',
  imports: [],
  templateUrl: './dash-card.html',
  styleUrl: './dash-card.scss'
})
export class DashCard {
  public title: InputSignal<string> = input.required();
  public subTitle: InputSignal<string> = input.required();
  public icon: InputSignal<string> = input.required();
  public value: InputSignal<string> = input.required();
  public description: InputSignal<string> = input('');
  public valueSmall: InputSignal<boolean> = input(false);
}
