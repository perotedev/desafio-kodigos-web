import {Pipe, PipeTransform} from '@angular/core';
import {ServiceOrderStatusEnum} from '../enums/ServiceOrderStatusEnum';

@Pipe({
  name: 'statusPipe',
  standalone: true
})
export class StatusPipe implements PipeTransform {
  transform(value: ServiceOrderStatusEnum): string {
    const statusMap: Record<ServiceOrderStatusEnum, string> = {
      [ServiceOrderStatusEnum.PENDING]: 'PENDENTE',
      [ServiceOrderStatusEnum.IN_PROGRESS]: 'EM EXECUÇÃO',
      [ServiceOrderStatusEnum.FINISHED]: 'FINALIZADA',
      [ServiceOrderStatusEnum.CANCELED]: 'CANCELADA'
    };

    return statusMap[value] || value;
  }
}
