import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'phoneMaskPipe'
})
export class PhoneMaskPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value || typeof value !== 'string') return value;

    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');

    // Check if it's a valid phone number length
    if (numbers.length < 10 || numbers.length > 11) return value;

    // Check if it's a mobile number (11 digits) or landline (10 digits)
    if (numbers.length === 11) {
      // Mobile phone format: (XX) XXXXX-XXXX
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    } else {
      // Landline format: (XX) XXXX-XXXX
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
      }
  }
}
