import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value || '').toString().trim();

    if (!value) return null; // permite vazio

    const digits = value.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 11
      ? null
      : { invalid: true };
  };
}
