import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IUser} from '../../shared/interfaces/IUser';
import {IPaginationResponse} from '../../shared/interfaces/IPaginationResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _http: HttpClient = inject(HttpClient);

  public getUsers(page: number, size: number, search: string, version: number = 1): Promise<IPaginationResponse<IUser>> {
    return lastValueFrom(this._http.get<IPaginationResponse<IUser>>(
      `${environment.apiUrl}/api/v${version}/users?page=${page}&size=${size}&search=${search}`
    ));
  }

  public getUser(id: number): Promise<IUser> {
    return lastValueFrom(this._http.get<IUser>(`${environment.apiUrl}/users/${id}`));
  }

  public createUser(user: IUser): Promise<IUser> {
    return lastValueFrom(this._http.post<IUser>(`${environment.apiUrl}/users`, user));
  }

  public updateUser(id: number, user: IUser): Promise<IUser> {
    return lastValueFrom(this._http.put<IUser>(`${environment.apiUrl}/users/${id}`, user));
  }

  public deleteUser(id: number): Promise<any> {
    return lastValueFrom(this._http.delete(`${environment.apiUrl}/users/${id}`));
  }
}
