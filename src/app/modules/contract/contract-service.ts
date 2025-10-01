import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IPaginationResponse} from '../../shared/interfaces/IPaginationResponse';
import {IContract} from '../../shared/interfaces/IContract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private readonly _http: HttpClient = inject(HttpClient);

  public getContracts(page: number, size: number, search: string): Promise<IPaginationResponse<IContract>> {
    return lastValueFrom(this._http.get<IPaginationResponse<IContract>>(
      `${environment.apiUrl}/contract?page=${page}&size=${size}&search=${search}`
    ));
  }

  public getContract(id: number): Promise<IContract> {
    return lastValueFrom(this._http.get<IContract>(`${environment.apiUrl}/contract/${id}`));
  }

  public createContract(contract: any): Promise<IContract> {
    return lastValueFrom(this._http.post<IContract>(`${environment.apiUrl}/contract`, contract));
  }

  public updateContract(id: number, contract: any): Promise<IContract> {
    return lastValueFrom(this._http.put<IContract>(`${environment.apiUrl}/contract/${id}`, contract));
  }

  public deleteContract(id: number): Promise<any> {
    return lastValueFrom(this._http.delete(`${environment.apiUrl}/contract/${id}`));
  }
}
