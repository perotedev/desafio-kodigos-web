import {Component, effect, inject, OnInit, output, OutputEmitterRef, signal, WritableSignal} from '@angular/core';
import {Loading} from '../../../shared/services/loading';
import {IS_MOBILE} from '../../../shared/services/is-mobile';
import {IContract} from '../../../shared/interfaces/IContract';
import {IPaginationResponse} from '../../../shared/interfaces/IPaginationResponse';
import {PaginatorState} from 'primeng/paginator';
import {ContractService} from '../contract-service';
import {ToastService} from '../../../shared/services/toast';
import {Button} from 'primeng/button';
import {
  ClCellDirective,
  ClCellTemplateDirective,
  ClHeaderDirective
} from '../../../shared/components/content-list/content-list-directives';
import {ContentList} from '../../../shared/components/content-list/content-list.component';
import {Dialog} from 'primeng/dialog';
import {InputSearch} from '../../../shared/components/input-search/input-search';
import {CurrencyPipe, DatePipe, NgStyle} from '@angular/common';
import {ContractForm} from '../contract-form/contract-form';
import {IClient} from '../../../shared/interfaces/IClient';

@Component({
  selector: 'app-contract-home',
  imports: [
    Button,
    ClCellDirective,
    ClCellTemplateDirective,
    ClHeaderDirective,
    ContentList,
    Dialog,
    InputSearch,
    NgStyle,
    ContractForm,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './contract-home.html',
  styleUrl: './contract-home.scss'
})
export class ContractHome implements OnInit {
  private readonly _contractService: ContractService = inject(ContractService);
  private readonly _loading: Loading = inject(Loading);
  private readonly _toast: ToastService = inject(ToastService);
  public readonly isMobile = inject(IS_MOBILE);
  public search: WritableSignal<string> = signal('');
  public isLoadingContracts: WritableSignal<boolean> = signal(false);
  public dialogVisible: boolean = false;
  public selectedContract: WritableSignal<IContract | undefined> = signal(undefined);
  public total: number = 10;
  public page: number = 1;
  public size: number = 10;
  public contracts: WritableSignal<IContract[]> = signal([]);
  public clients: WritableSignal<IClient[]> = signal([]);

  constructor() {
    effect(() => {
      this.page = 1;
      this.size = 10;
      this.getContracts(this.page, this.size, this.search());
    });
  }

  private getContracts(page: number, size: number, search = ""): void {
    this.isLoadingContracts.set(true);
    this._contractService.getContracts(page, size, search)
      .then((res: IPaginationResponse<IContract>) => {
        this.contracts.set(res.items);
        this.page = res.page;
        this.size = res.size;
        this.total = res.total;
      }).finally(() => this.isLoadingContracts.set(false));
  }

  private getClients(): void {
    this._contractService.getClients(1, 100, "")
      .then((res: IPaginationResponse<IClient>) => {
        this.clients.set(res.items);
      }).catch((err: any) => {
        this._toast.showToastError("Erro ao listar clientes!");
      });
  }

  private deleteContract(contractId: number): void {
    this._loading.present();
    this._contractService.deleteContract(contractId)
      .then((res: any) => {
        this.contracts.set([...this.contracts().filter(contract => contract.id !== contractId)]);
        this._toast.showToastSuccess("Contrato excluído com sucesso!");
      }).finally(() => this._loading.dismiss());
  }

  public removeContract(contractId: number): void {
    this.deleteContract(contractId);
  }

  public ngOnInit(): void {
    this.getClients();
  }

  public onSaveCotract(contract: IContract): void {
    const existingContract = this.contracts().find(c => c.id === contract.id);
    if (existingContract) {
      this.contracts.set(this.contracts().map(c => c.id === contract.id ? contract : c));
    } else {
      this.contracts.set([...this.contracts(), contract]);
    }

    this.toggleDialog();
  }

  public onPageChange(event: PaginatorState): void {
    this.page = event.page!;
    this.size = event.rows!;
    this.getContracts(this.page, this.size);
  }

  public toggleDialog(contract?: IContract): void {
    this.selectedContract.set(contract);
    this.dialogVisible = !this.dialogVisible;
  }
}
