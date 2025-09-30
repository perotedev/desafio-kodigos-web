import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {cpf} from 'cpf-cnpj-validator';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value || '').toString().trim();

    if (!value) return null; // permite vazio

    return cpf.isValid(value) ? null : { invalid: true };
  };
}
