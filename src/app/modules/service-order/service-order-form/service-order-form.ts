import {Component, inject, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {Textarea} from 'primeng/textarea';
import {InputText} from 'primeng/inputtext';
import {IServiceOrder} from '../../../shared/interfaces/IServiceOrder';
import {Button} from 'primeng/button';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {markDirtyFields} from '../../../shared/utils/form-utils';
import {ToastService} from '../../../shared/services/toast';
import {IClient} from '../../../shared/interfaces/IClient';
import {IContract} from '../../../shared/interfaces/IContract';
import {Loading} from '../../../shared/services/loading';
import {ServiceOrderService} from '../service-order-service';
import {ServiceOrderStatusEnum} from '../../../shared/enums/ServiceOrderStatusEnum';

@Component({
  selector: 'app-service-order-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FloatLabel,
    Select,
    DatePicker,
    Textarea,
    InputText,
    Button
  ],
  templateUrl: './service-order-form.html',
  styleUrl: './service-order-form.scss'
})
export class ServiceOrderForm {
  public editSO: InputSignal<IServiceOrder | undefined> = input<IServiceOrder | undefined>(undefined);
  public isDetails: InputSignal<boolean> = input(false);
  public clients: InputSignal<IClient[]> = input<IClient[]>([]);
  public contracts: InputSignal<IContract[]> = input<IContract[]>([]);
  public onSave: OutputEmitterRef<IServiceOrder> = output();

  private readonly _toast: ToastService = inject(ToastService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _serviceOrderService: ServiceOrderService = inject(ServiceOrderService);
  private readonly _loading: Loading = inject(Loading);
  public readonly isMobile = inject(IS_MOBILE);
  public formSO: FormGroup;

  constructor() {
    this.formSO = this._formBuilder.group({
      client_id: [null, [Validators.required]],
      responsavel: [null],
      contract_id: [null],
      start_date: [null, [Validators.required]],
      end_date: [null],
      hour_start: [null],
      hour_end: [null],
      code: [''],
      status: [''],
      adress: ['', [Validators.required]],
      description: ['']
    })
  }

  private createOs(): void {
    this._loading.present();
    const value = this.formSO.value;
    value.start_date = new Date(value.start_date).toISOString().split('T')[0];
    value.status = ServiceOrderStatusEnum.PENDING;
    this._serviceOrderService.createServiceOrder(value as IServiceOrder)
      .then((res: IServiceOrder) => {
        this.onSave.emit(res);
      }).catch((err: any) => {
        this._toast.showToastError("Erro ao criar ordem de serviço!");
      }).finally(() => this._loading.dismiss());
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    if (this.formSO.invalid) {
      markDirtyFields(this.formSO, this._toast)
      return
    }

    this.createOs();
  }
}
