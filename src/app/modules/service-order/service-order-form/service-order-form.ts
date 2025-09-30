import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {Textarea} from 'primeng/textarea';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-service-order-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FloatLabel,
    Select,
    DatePicker,
    Textarea,
    InputText
  ],
  templateUrl: './service-order-form.html',
  styleUrl: './service-order-form.scss'
})
export class ServiceOrderForm {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  public formSO: FormGroup;
  public clients: any[] = [
    {
      id: 1,
      name: 'TechSolutions Corp'
    },
    {
      id: 2,
      name: 'Global Dynamics Ltd'
    },
    {
      id: 3,
      name: 'Infinite Systems Inc'
    }
  ]
  public contracts: any[] = [
    {
      id: 1,
      name: 'TSC-2024-001'
    },
    {
      id: 2,
      name: 'GDL-2024-002'
    },
    {
      id: 3,
      name: 'ISI-2024-003'
    }
  ]

  constructor() {
    this.formSO = this._formBuilder.group({
      client_id: [null],
      responsavel: [null],
      contract_id: [null],
      date_start: [null],
      date_end: [null],
      hour_start: [null],
      hour_end: [null],
      code: [''],
      status: [''],
      adress: [],
      description: ['']
    })
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }
}
