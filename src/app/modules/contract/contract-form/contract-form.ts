import {Component, inject, input, InputSignal, OnInit, output, OutputEmitterRef} from '@angular/core';
import {IContract} from '../../../shared/interfaces/IContract';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Loading} from '../../../shared/services/loading';
import {ToastService} from '../../../shared/services/toast';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {ContractService} from '../contract-service';
import {markDirtyFields} from '../../../shared/utils/form-utils';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {Button} from 'primeng/button';
import {IClient} from '../../../shared/interfaces/IClient';
import {ClientService} from '../../client/client-service';
import {IPaginationResponse} from '../../../shared/interfaces/IPaginationResponse';
import {Textarea} from 'primeng/textarea';
import {InputNumber} from 'primeng/inputnumber';

@Component({
  selector: 'app-contract-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FloatLabel,
    Select,
    DatePicker,
    Button,
    Textarea,
    InputNumber
  ],
  templateUrl: './contract-form.html',
  styleUrl: './contract-form.scss'
})
export class ContractForm implements OnInit{
  public editContract: InputSignal<IContract | undefined> = input<IContract | undefined>(undefined);
  public onSaveContract: OutputEmitterRef<IContract> = output();

  private readonly _contractService: ContractService = inject(ContractService);
  private readonly _clientService: ClientService = inject(ClientService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _loading: Loading = inject(Loading);
  private readonly _toast: ToastService = inject(ToastService);
  public readonly isMobile = inject(IS_MOBILE);
  public formContract: FormGroup;
  public isLoadingClients: boolean = false;
  public clients: IClient[] = [];

  constructor() {
    this.formContract = this._formBuilder.group({
      client_id: ['', [Validators.required]],
      date_start: ['', [Validators.required]],
      date_end: ['', [Validators.required]],
      value: ['', [Validators.required]],
      description: ['']
    });
  }

  private getClients(): void {
    this.isLoadingClients = true;
    this._clientService.getClients(1, 1000, "")
      .then((res: IPaginationResponse<IClient>) => {
        this.clients = res.items;
      }).catch((err: any) => {
        this._toast.showToastError("Erro ao listar clientes!");
      }).finally(() => this.isLoadingClients = false);
  }

  private saveContract(): void {
    this._loading.present();

    const req: Promise<IContract> =
      this.editContract()
        ? this._contractService.updateContract(this.editContract()!.id!, this.formContract.value)
        : this._contractService.createContract(this.formContract.value);

    req.then((res: IContract) => {
      this._toast.showToastSuccess("Contrato cadastrado com sucesso!");
      this.onSaveContract.emit(res);
    }).catch((err: any) => {
      this._toast.showToastError(`Erro ao ${this.editContract() ? 'atualizar' : 'cadastrar'} contrato!`);
    }).finally(() => this._loading.dismiss());
  }

  public ngOnInit(): void {
    this.getClients();
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    if (this.formContract.invalid) {
      markDirtyFields(this.formContract, this._toast);
      return;
    }

    this.saveContract();
  }

}
