import {Component, inject, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {IClient} from '../../../shared/interfaces/IClient';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Loading} from '../../../shared/services/loading';
import {ToastService} from '../../../shared/services/toast';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {ClientService} from '../client-service';
import {phoneValidator} from '../../../shared/validators/phoneValidator';
import {debounceTime, Subject} from 'rxjs';
import {IViaCep} from '../../../shared/interfaces/IViaCep';
import {IAdress} from '../../../shared/interfaces/IAdress';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {Textarea} from 'primeng/textarea';
import {markDirtyFields} from '../../../shared/utils/form-utils';
import {InputMask} from 'primeng/inputmask';

@Component({
  selector: 'app-cliente-form',
  imports: [
    Button,
    FloatLabel,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    Select,
    Textarea,
    InputMask
  ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.scss'
})
export class ClienteForm {
  public editClient: InputSignal<IClient | undefined> = input<IClient | undefined>(undefined);
  public onSaveClient: OutputEmitterRef<IClient> = output();

  private readonly _clientService: ClientService = inject(ClientService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _loading: Loading = inject(Loading);
  private readonly _toast: ToastService = inject(ToastService);
  private readonly _cepSubject: Subject<string> = new Subject<string>();
  public readonly isMobile = inject(IS_MOBILE);
  public formClient: FormGroup;

  constructor() {
    this.formClient = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      phone: ['', [phoneValidator()]],
      cnpj: [''],
      adress: this._formBuilder.group({
        street: [''],
        number: [''],
        complement: [''],
        neighborhood: [''],
        city: [''],
        state: [''],
        cep: ['']
      })
    });

    this._cepSubject.pipe(debounceTime(1000)).subscribe({
      next: (value: string) => {
        if (value.trim().length > 0) {
          this.getCep(value);
        }
      }
    });
  }

  private saveClient(): void {
    this._loading.present();

    const req: Promise<IClient> =
      this.editClient()
        ? this._clientService.updateClient(this.editClient()!.id!, this.formClient.value)
        : this._clientService.createClient(this.formClient.value);

    req.then((res: IClient) => {
      this._toast.showToastSuccess("Cliente cadastrado com sucesso!");
      this.onSaveClient.emit(res);
    }).catch((err: any) => {
      this._toast.showToastError(`Erro ao ${this.editClient() ? 'atualizar' : 'cadastrar'} cliente!`);
    }).finally(() => this._loading.dismiss());
  }

  private getCep(cep: string): void {
    this._clientService.getCep(cep)
      .then((value: IViaCep) => {
        this.formClient.patchValue({
          adress: {
            state: value.uf,
            city: value.localidade,
            neighborhood: value.bairro,
            street: value.logradouro
          }
        });
        const input = document.getElementById('clientCep') as HTMLInputElement;
        input.blur()
      });
  }

  public onWriteCep(): void {
    const value: IAdress = this.formClient.controls['adress'].value as IAdress;
    if (value.cep !== "") {
      this._cepSubject.next(value.cep.replace("-", ""));
    }
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    if (this.formClient.invalid) {
      markDirtyFields(this.formClient, this._toast);
      return;
    }

    this.saveClient();
  }
}
