import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
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
import {NgStyle} from '@angular/common';
import {ContractForm} from '../contract-form/contract-form';

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
    ContractForm
  ],
  templateUrl: './contract-home.html',
  styleUrl: './contract-home.scss'
})
export class ContractHome {
  private readonly _contractService: ContractService = inject(ContractService);
  private readonly _loading: Loading = inject(Loading);
  private readonly _toast: ToastService = inject(ToastService);
  public readonly isMobile = inject(IS_MOBILE);
  public search: WritableSignal<string> = signal('');
  public isLoadingContracts: boolean = false;
  public dialogVisible: boolean = false;
  public selectedContract?: IContract;
  public total: number = 10;
  public page: number = 1;
  public size: number = 10;
  public contracts: IContract[] = [];

  constructor() {
    effect(() => {
      this.page = 1;
      this.size = 10;
      this.getContracts(this.page, this.size, this.search());
    });
  }

  private getContracts(page: number, size: number, search = ""): void {
    this.isLoadingContracts = true;
    this._contractService.getContracts(page, size, search)
      .then((res: IPaginationResponse<IContract>) => {
        this.contracts = res.items;
        this.page = res.page;
        this.size = res.size;
        this.total = res.total;
      }).finally(() => this.isLoadingContracts = false);
  }

  private deleteContract(contractId: number): void {
    this._loading.present();
    this._contractService.deleteContract(contractId)
      .then((res: any) => {
        this.contracts = [...this.contracts.filter(contract => contract.id !== contractId)];
        this._toast.showToastSuccess("Contrato excluído com sucesso!");
      }).finally(() => this._loading.dismiss());
  }

  public removeContract(contractId: number): void {
    this.deleteContract(contractId);
  }

  public ngOnInit(): void {
    this.getContracts(this.page, this.size);
  }

  public onPageChange(event: PaginatorState): void {
    this.page = event.page!;
    this.size = event.rows!;
    this.getContracts(this.page, this.size);
  }

  public toggleDialog(contract?: IContract): void {
    this.selectedContract = contract;
    this.dialogVisible = !this.dialogVisible;
  }
}
