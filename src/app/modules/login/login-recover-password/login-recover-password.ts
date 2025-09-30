import {Component, inject, Signal} from '@angular/core';
import {Button} from "primeng/button";
import {ContainerCard} from "../../../shared/components/container-card/container-card";
import {DatePicker} from "primeng/datepicker";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {LogoHeader} from "../../../shared/components/logo-header/logo-header";
import {Password} from "primeng/password";
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {Loading} from '../../../shared/services/loading';
import {NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-recover-password',
    imports: [
      Button,
      ContainerCard,
      FormsModule,
      InputText,
      LogoHeader,
      RouterLink,
      ReactiveFormsModule,
      NgStyle
    ],
  templateUrl: './login-recover-password.html',
  styleUrl: './login-recover-password.scss'
})
export class LoginRecoverPassword {
  public readonly isMobile: Signal<boolean> = inject(IS_MOBILE);
  private readonly _loadingService: Loading = inject(Loading);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);

  public formSignup: FormGroup;
  public maxDate: Date = new Date();

  constructor() {
    this.formSignup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }
}
