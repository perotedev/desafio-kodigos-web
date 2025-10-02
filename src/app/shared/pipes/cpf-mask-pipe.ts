import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'cpfMaskPipe'
})
export class CpfMaskPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) return '';

    const cpf = value.toString().replace(/\D/g, ''); // Remove non-digits

    if (cpf.length !== 11) return value;

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }
}
