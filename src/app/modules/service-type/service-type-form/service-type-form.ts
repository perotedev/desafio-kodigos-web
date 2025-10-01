import {Component, inject, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {IServiceType} from '../../../shared/interfaces/IServiceType';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../../shared/services/toast';
import {Loading} from '../../../shared/services/loading';
import {ServiceTypeService} from '../service-type-service';
import {markDirtyFields} from '../../../shared/utils/form-utils';

@Component({
  selector: 'app-service-type-form',
  imports: [],
  templateUrl: './service-type-form.html',
  styleUrl: './service-type-form.scss'
})
export class ServiceTypeForm {
  public editServiceType: InputSignal<IServiceType | undefined> = input<IServiceType | undefined>(undefined);
  public onSaveServiceType: OutputEmitterRef<IServiceType> = output();

  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _toast: ToastService = inject(ToastService);
  private readonly _serviceTypeService: ServiceTypeService = inject(ServiceTypeService);
  private readonly _loading: Loading = inject(Loading);
  public formServiceType: FormGroup;

  constructor() {
    this.formServiceType = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      icon: ['', [Validators.required]]
    });
  }


  private saveServiceType(): void {
    this._loading.present();

    const req: Promise<IServiceType> =
      this.editServiceType()
        ? this._serviceTypeService.updateServiceType(this.editServiceType()!.id!, this.formServiceType.value)
        : this._serviceTypeService.createServiceType(this.formServiceType.value);

    req.then((res: IServiceType) => {
      this._toast.showToastSuccess("Tipo de serviço cadastrado com sucesso!");
      this.onSaveServiceType.emit(res);
    }).catch((err: any) => {
      this._toast.showToastError(`Erro ao ${this.editServiceType() ? 'atualizar' : 'cadastrar'} tipo de serviço!`);
    }).finally(() => this._loading.dismiss());
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    if (this.formServiceType.invalid) {
      markDirtyFields(this.formServiceType, this._toast);
      return;
    }

    this.saveServiceType();
  }
}
