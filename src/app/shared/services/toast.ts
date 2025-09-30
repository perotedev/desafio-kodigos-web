import {inject, Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly messageService: MessageService = inject(MessageService);

  public showToastSuccess(msg: string): void {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Sucesso', detail: msg });
  }

  public showToastError(msg: string): void {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Erro', detail: msg });
  }

  public showToastInfo(msg: string): void {
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Informação', detail: msg });
  }

  public showToastWarn(msg: string): void {
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Observação', detail: msg });
  }
}
