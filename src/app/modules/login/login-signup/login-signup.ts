import {Component, inject, Signal} from '@angular/core';
import {Button} from 'primeng/button';
import {ContainerCard} from '../../../shared/components/container-card/container-card';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {LogoHeader} from '../../../shared/components/logo-header/logo-header';
import {Password} from 'primeng/password';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {Loading} from '../../../shared/services/loading';
import {NgStyle} from '@angular/common';
import {DatePicker} from 'primeng/datepicker';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-signup',
  imports: [
    Button,
    ContainerCard,
    FormsModule,
    InputText,
    LogoHeader,
    Password,
    ReactiveFormsModule,
    NgStyle,
    DatePicker,
    RouterLink
  ],
  templateUrl: './login-signup.html',
  styleUrl: './login-signup.scss'
})
export class LoginSignup {
  public readonly isMobile: Signal<boolean> = inject(IS_MOBILE);
  private readonly _loadingService: Loading = inject(Loading);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);

  public formSignup: FormGroup;
  public maxDate: Date = new Date();

  constructor() {
    this.formSignup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      birth: ['', [Validators.required]]
    });
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }

}
