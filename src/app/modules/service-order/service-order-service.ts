import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IPaginationResponse} from '../../shared/interfaces/IPaginationResponse';
import {lastValueFrom} from 'rxjs';
import {IServiceOrder} from '../../shared/interfaces/IServiceOrder';
import {environment} from '../../../environments/environment';
import {IServiceOrderDocument} from '../../shared/interfaces/IServiceOrderDocument';
import {IServiceOrderItem} from '../../shared/interfaces/IServiceOrderItem';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {
  private readonly _http: HttpClient = inject(HttpClient);

  public getServiceOrders(page: number, size: number, search: string, version = 1): Promise<IPaginationResponse<IServiceOrder>> {
    return lastValueFrom(this._http.get<IPaginationResponse<IServiceOrder>>(
      `${environment.apiUrl}/api/v${version}/service-orders?page=${page}&size=${size}&search=${search}`
    ));
  }

  public getServiceOrder(id: number, version = 1): Promise<IServiceOrder> {
    return lastValueFrom(this._http.get<IServiceOrder>(`${environment.apiUrl}/api/v${version}/service-orders/${id}`));
  }

  public createServiceOrder(serviceOrder: any): Promise<IServiceOrder> {
    return lastValueFrom(this._http.post<IServiceOrder>(`${environment.apiUrl}/service-order`, serviceOrder));
  }

  public updateServiceOrder(id: number, serviceOrder: any): Promise<IServiceOrder> {
    return lastValueFrom(this._http.put<IServiceOrder>(`${environment.apiUrl}/service-order/${id}`, serviceOrder));
  }

  public deleteServiceOrder(id: number): Promise<any> {
    return lastValueFrom(this._http.delete(`${environment.apiUrl}/service-order/${id}`));
  }

  public getServiceOrderItems(id: number): Promise<IServiceOrderItem[]> {
    return lastValueFrom(this._http.get<IServiceOrderItem[]>(`${environment.apiUrl}/service-order/${id}/items`));
  }

  public getServiceDocuments(id: number): Promise<IServiceOrderDocument[]> {
    return lastValueFrom(this._http.get<IServiceOrderDocument[]>(`${environment.apiUrl}/service-order/${id}/documents`));
  }
}
