import {Component, inject, Signal} from '@angular/core';
import {ContainerCard} from '../../../shared/components/container-card/container-card';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {NgStyle} from '@angular/common';
import {LogoHeader} from '../../../shared/components/logo-header/logo-header';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Loading} from '../../../shared/services/loading';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {markDirtyFields} from '../../../shared/utils/form-utils';
import {ToastService} from '../../../shared/services/toast';
import {IAuthReponse} from '../../../shared/interfaces/IAuth';
import {AuthService} from '../../../core/auth/auth-service';

@Component({
  selector: 'app-login-signin',
  imports: [
    ContainerCard,
    NgStyle,
    LogoHeader,
    ReactiveFormsModule,
    FormsModule,
    Password,
    Button,
    RouterLink,
    InputText
  ],
  templateUrl: './login-signin.html',
  styleUrl: './login-signin.scss'
})
export class LoginSignin {
  public readonly isMobile: Signal<boolean> = inject(IS_MOBILE);
  private readonly _loading: Loading = inject(Loading);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _toast: ToastService = inject(ToastService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  public formLogin: FormGroup;

  constructor() {
    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  private login(): void {
    this._loading.present();
    const formData = new FormData();
    formData.append('username', this.formLogin.value.email);
    formData.append('password', this.formLogin.value.password);

    this._authService.signUp(formData)
      .then((res: IAuthReponse) => {
        this._authService.setUser(res);
        this._router.navigate(['/home']);
      }).finally(() => this._loading.dismiss());
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    if (this.formLogin.invalid) {
      markDirtyFields(this.formLogin, this._toast)
      return;
    }

    this.login();
  }
}
