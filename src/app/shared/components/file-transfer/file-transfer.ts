import {Component, effect, inject, signal, Signal, WritableSignal} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {IFileTransfer, IFileTransferList} from '../../interfaces/IFileTransfer';
import {FileTransferService} from '../../services/file-transfer';
import {style, animate, trigger, transition, state} from '@angular/animations';

@Component({
  selector: 'app-file-transfer',
  imports: [ConfirmDialog],
  templateUrl: './file-transfer.html',
  styleUrl: './file-transfer.scss',
  providers: [ConfirmationService],
  animations: [
    trigger('contentSlide', [
      state('collapsed', style({
        height: '0px',
        maxHeight: '0px',
        opacity: 0,
        overflowY: 'hidden',
        padding: '0px',
        marginTop: '0px'
      })),
      state('expanded', style({
        height: '*',
        maxHeight: '200px',
        opacity: 1,
        overflowY: 'auto',
        padding: '*',
        marginTop: '10px'
      })),
      transition('collapsed <=> expanded', animate('200ms ease-in-out')),
    ]),
  ]
})
export class FileTransfer {
  public transfers: Signal<IFileTransferList>;
  public readonly expanded: WritableSignal<boolean> = signal(true);
  private readonly _fileTransferService = inject(FileTransferService);
  private readonly _confirmationService = inject(ConfirmationService);

  constructor() {
    this.transfers = this._fileTransferService.fileTransfer;

    effect(() => {
      if (!this.transfers().finishTransfer) {
        this.expanded.set(true);
      }
    });
  }

  private confirmClose(transfer?: IFileTransfer) {
    const msg = transfer?
      "O arquivo ainda está em transferência,deseja cancelar a operação?":
      "Ainda existem arquivos em transferência, deseja cancelar a operação?";
    this._confirmationService.confirm({
      header: 'Cancelar Operação',
      message: msg,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: async () => {
        if (transfer) {
          this.cancelOne(transfer);
        } else {
          this._fileTransferService.closeAll();
        }
      },
    });
  }

  public cancelOne(transfer: IFileTransfer): void {
    this._fileTransferService.cancelOne(transfer);
  }

  public toggleExpanded(): void {
    this.expanded.update(value => !value);
  }

  public triggerAction(transfer:IFileTransfer): void {
    this._fileTransferService.triggerAction(transfer);
  }

  public closeAll(): void {
    const isLoading = this.transfers().transfers.some(transfer => transfer.loading);
    if(isLoading) {
      this.confirmClose()
    } else {
      this._fileTransferService.closeAll();
    }
  }
}
