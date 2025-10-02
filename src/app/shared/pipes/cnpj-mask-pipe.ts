import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'cnpjMaskPipe'
})
export class CnpjMaskPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) return '';

    const cnpj = value.toString().replace(/\D/g, '');

    if (cnpj.length !== 14) return value;

    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

}
