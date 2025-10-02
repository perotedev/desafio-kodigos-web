import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IPaginationResponse} from '../../shared/interfaces/IPaginationResponse';
import {IContract} from '../../shared/interfaces/IContract';
import {IClient} from '../../shared/interfaces/IClient';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private readonly _http: HttpClient = inject(HttpClient);

  public getContracts(page: number, size: number, search: string, version: number = 1): Promise<IPaginationResponse<IContract>> {
    return lastValueFrom(this._http.get<IPaginationResponse<IContract>>(
      `${environment.apiUrl}/api/v${version}/contracts?page=${page}&size=${size}&search=${search}`
    ));
  }

  public getContract(id: number): Promise<IContract> {
    return lastValueFrom(this._http.get<IContract>(`${environment.apiUrl}/contract/${id}`));
  }

  public createContract(contract: any, version: number = 1): Promise<IContract> {
    return lastValueFrom(this._http.post<IContract>(`${environment.apiUrl}/api/v${version}/contracts`, contract));
  }

  public updateContract(id: number, contract: any, version: number = 1): Promise<IContract> {
    return lastValueFrom(this._http.put<IContract>(`${environment.apiUrl}/api/v${version}/contracts/${id}`, contract));
  }

  public deleteContract(id: number): Promise<any> {
    return lastValueFrom(this._http.delete(`${environment.apiUrl}/contract/${id}`));
  }

  public getClients(page: number, size: number, search: string, version: number = 1): Promise<IPaginationResponse<IClient>> {
    return lastValueFrom(this._http.get<IPaginationResponse<IClient>>(
      `${environment.apiUrl}/api/v${version}/clients?page=${page}&size=${size}&search=${search}`
    ));
  }
}
