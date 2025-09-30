import {Component, inject, Signal} from '@angular/core';
import {ContainerCard} from '../../../shared/components/container-card/container-card';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {NgStyle} from '@angular/common';
import {LogoHeader} from '../../../shared/components/logo-header/logo-header';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Loading} from '../../../shared/services/loading';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

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
  private readonly _loadingService: Loading = inject(Loading);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);

  public formLogin: FormGroup;

  constructor() {
    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }
}
