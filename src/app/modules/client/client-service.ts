import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IPaginationResponse} from '../../shared/interfaces/IPaginationResponse';
import {IClient} from '../../shared/interfaces/IClient';
import {IViaCep} from '../../shared/interfaces/IViaCep';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly _http: HttpClient = inject(HttpClient);

  public getClients(page: number, size: number, search: string, version: number = 1): Promise<IPaginationResponse<IClient>> {
    return lastValueFrom(this._http.get<IPaginationResponse<IClient>>(
      `${environment.apiUrl}/api/v${version}/clients?page=${page}&size=${size}&search=${search}`
    ));
  }

  public createClient(client: any, version: number = 1): Promise<IClient> {
    return lastValueFrom(this._http.post<IClient>(`${environment.apiUrl}/api/v${version}/clients`, client));
  }

  public updateClient(id: number, client: any, version: number = 1): Promise<IClient> {
    return lastValueFrom(this._http.put<IClient>(`${environment.apiUrl}/api/v${version}/clients/${id}`, client));
  }

  public deleteClient(id: number): Promise<any> {
    return lastValueFrom(this._http.delete(`${environment.apiUrl}/client/${id}`));
  }

  public async getCep(cep: string): Promise<IViaCep> {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) throw new Error('Failed to fetch CEP data');
    return response.json();
  }
}
