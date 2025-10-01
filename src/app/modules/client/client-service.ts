import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IPaginationResponse} from '../../shared/interfaces/IPaginationResponse';
import {IClient} from '../../shared/interfaces/IClient';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly _http: HttpClient = inject(HttpClient);

  public getClients(page: number, size: number, search: string): Promise<IPaginationResponse<IClient>> {
    return lastValueFrom(this._http.get<IPaginationResponse<IClient>>(
      `${environment.apiUrl}/client?page=${page}&size=${size}&search=${search}`
    ));
  }

  public getClient(id: number): Promise<IClient> {
    return lastValueFrom(this._http.get<IClient>(`${environment.apiUrl}/client/${id}`));
  }

  public createClient(client: any): Promise<IClient> {
    return lastValueFrom(this._http.post<IClient>(`${environment.apiUrl}/client`, client));
  }

  public updateClient(id: number, client: any): Promise<IClient> {
    return lastValueFrom(this._http.put<IClient>(`${environment.apiUrl}/client/${id}`, client));
  }

  public deleteClient(id: number): Promise<any> {
    return lastValueFrom(this._http.delete(`${environment.apiUrl}/client/${id}`));
  }
}
