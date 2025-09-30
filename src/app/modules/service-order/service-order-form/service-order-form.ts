import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-service-order-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './service-order-form.html',
  styleUrl: './service-order-form.scss'
})
export class ServiceOrderForm {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  public formSO: FormGroup;

  constructor() {
    this.formSO = this._formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      description: [''],
      address: [''],
      city: [''],
      state: [''],
      zipcode: [''],
      service: [''],
    })
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }
}
