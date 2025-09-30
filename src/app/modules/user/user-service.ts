import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IUser} from '../../shared/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _http: HttpClient = inject(HttpClient);

  public getUsers(page: number, size: number, search: string): Promise<any> {
    return lastValueFrom(this._http.get(
      `${environment.apiUrl}/users?page=${page}&size=${size}&search=${search}`
    ));
  }

  public getUser(id: number): Promise<any> {
    return lastValueFrom(this._http.get(`${environment.apiUrl}/users/${id}`));
  }

  public createUser(user: IUser): Promise<any> {
    return lastValueFrom(this._http.post(`${environment.apiUrl}/users`, user));
  }

  public updateUser(id: number, user: IUser): Promise<any> {
    return lastValueFrom(this._http.put(`${environment.apiUrl}/users/${id}`, user));
  }

  public deleteUser(id: number): Promise<any> {
    return lastValueFrom(this._http.delete(`${environment.apiUrl}/users/${id}`));
  }
}
