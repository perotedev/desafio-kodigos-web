import {Component, inject, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IServiceOrderItem} from '../../../shared/interfaces/IServiceOrderItem';
import {IServiceType} from '../../../shared/interfaces/IServiceType';
import {ServiceOrderService} from '../service-order-service';
import {Loading} from '../../../shared/services/loading';
import {ToastService} from '../../../shared/services/toast';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {markDirtyFields} from '../../../shared/utils/form-utils';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'app-service-order-item-form',
  imports: [
    Button,
    FloatLabel,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    Select,
    Textarea
  ],
  templateUrl: './service-order-item-form.html',
  styleUrl: './service-order-item-form.scss'
})
export class ServiceOrderItemForm {
  public soId: InputSignal<number> = input.required();
  public serviceTypes: InputSignal<IServiceType[]> = input.required();
  public editItem: InputSignal<IServiceOrderItem | undefined> = input<IServiceOrderItem | undefined>(undefined);
  public onSaveItem: OutputEmitterRef<IServiceOrderItem> = output();

  private readonly _soService: ServiceOrderService = inject(ServiceOrderService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _loading: Loading = inject(Loading);
  private readonly _toast: ToastService = inject(ToastService);
  public readonly isMobile = inject(IS_MOBILE);
  public formItem: FormGroup;

  constructor() {
    this.formItem = this._formBuilder.group({
      service_type_id: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      notes: ['']
    });
  }

  private saveItem(): void {
    this._loading.present();

  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    if (this.formItem.invalid) {
      markDirtyFields(this.formItem, this._toast);
      return;
    }

    this.saveItem();
  }
}
