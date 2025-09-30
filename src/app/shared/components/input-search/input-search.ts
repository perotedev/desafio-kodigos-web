import {Component, input, InputSignal, model, ModelSignal, output, OutputEmitterRef} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {BehaviorSubject, debounceTime} from 'rxjs';

@Component({
  selector: 'app-input-search',
  imports: [
    FormsModule,
    InputText
  ],
  templateUrl: './input-search.html',
  styleUrl: './input-search.scss'
})
export class InputSearch {
  private _subject: BehaviorSubject<string> = new BehaviorSubject('');
  public value: ModelSignal<string> = model("");
  public placeholder: InputSignal<string> = input('Pesquisar');
  public onUpdate: OutputEmitterRef<string> = output();

  constructor() {
    this._subject.pipe(debounceTime(700)).subscribe({
      next: (value: string) => {
        this.value.set(value);
        this.onUpdate.emit(value);
      }
    })
  }

  public updateValue(value: string): void {
    this._subject.next(value);
  }
}
