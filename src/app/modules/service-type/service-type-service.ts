import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IPaginationResponse} from '../../shared/interfaces/IPaginationResponse';
import {IServiceType} from '../../shared/interfaces/IServiceType';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {
  private readonly _http: HttpClient = inject(HttpClient);

  public getServiceTypes(page: number, size: number, search: string, version: number = 1): Promise<IPaginationResponse<IServiceType>> {
    return lastValueFrom(this._http.get<IPaginationResponse<IServiceType>>(
      `${environment.apiUrl}/api/v${version}/service-types?page=${page}&size=${size}&search=${search}`
    ));
  }

  public getServiceType(id: number): Promise<IServiceType> {
    return lastValueFrom(this._http.get<IServiceType>(`${environment.apiUrl}/service-type/${id}`));
  }

  public createServiceType(serviceType: any, version: number = 1): Promise<IServiceType> {
    return lastValueFrom(this._http.post<IServiceType>(`${environment.apiUrl}/api/v${version}/service-types`, serviceType));
  }

  public updateServiceType(id: number, serviceType: any, version: number = 1): Promise<IServiceType> {
    return lastValueFrom(this._http.put<IServiceType>(`${environment.apiUrl}/api/v${version}/service-types/${id}`, serviceType));
  }

  public deleteServiceType(id: number): Promise<any> {
    return lastValueFrom(this._http.delete(`${environment.apiUrl}/service-type/${id}`));
  }
}
