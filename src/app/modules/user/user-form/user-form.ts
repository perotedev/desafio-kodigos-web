import {Component, inject, input, InputSignal, OnInit, output, OutputEmitterRef} from '@angular/core';
import {IUser} from '../../../shared/interfaces/IUser';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {cpfValidator} from '../../../shared/validators/cpfValidator';
import {phoneValidator} from '../../../shared/validators/phoneValidator';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {DatePicker} from 'primeng/datepicker';
import {InputMask} from 'primeng/inputmask';
import {ToastService} from '../../../shared/services/toast';
import {markDirtyFields} from '../../../shared/utils/form-utils';
import {UserService} from '../user-service';
import {Loading} from '../../../shared/services/loading';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    InputText,
    FloatLabel,
    Button,
    DatePicker,
    InputMask,
    Select
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserForm implements OnInit {
  public editUser: InputSignal<IUser | undefined> = input<IUser | undefined>(undefined);
  public onSaveUser: OutputEmitterRef<IUser> = output();

  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _toast: ToastService = inject(ToastService);
  private readonly _userService: UserService = inject(UserService);
  private readonly _loading: Loading = inject(Loading);
  public readonly maxDate: Date = new Date();
  public formUser: FormGroup;

  constructor() {
    this.formUser = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      birth: ['', Validators.required],
      cpf: ['', [cpfValidator()]],
      phone: ['', [phoneValidator()]],
      active: [false, [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  private saveUser(): void {
    this._loading.present();

    const req: Promise<IUser> =
      this.editUser()
        ?this._userService.updateUser(this.editUser()!.id!, this.formUser.value)
        :this._userService.createUser(this.formUser.value);

    req.then((res: IUser) => {
      this._toast.showToastSuccess("Usuário cadastrado com sucesso!");
      this.onSaveUser.emit(res);
    }).catch((err: any) => {
      this._toast.showToastError(`Erro ao ${this.editUser()?'atualizar':'cadastrar'} usuário!`);
    }).finally(() => this._loading.dismiss());
  }

  public ngOnInit(): void {
    if (!this.editUser()) {
      this.formUser.controls['active'].setValue(true);
    }
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    if (this.formUser.invalid) {
      markDirtyFields(this.formUser, this._toast);
      return;
    }

    this.saveUser();
  }
}
