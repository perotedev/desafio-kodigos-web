import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {lastValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {IAuthReponse} from '../../shared/interfaces/IAuth';
import {environment} from '../../../environments/environment';
import {IMessage} from '../../shared/interfaces/IMessage';
import {CurrentUser} from '../../shared/services/current-user';

export const APP_ACCESS_TOKEN: string = "appToken";
export const APP_REFRESH_TOKEN: string = "appRefreshToken";
export const USER_ID: string = "appUserId";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _router: Router = inject(Router);
  private readonly _currentUser: CurrentUser = inject(CurrentUser);

  public signUp(authForm: FormData, version: number = 1): Promise<IAuthReponse> {
    return lastValueFrom(this._http.post<IAuthReponse>(`${environment.apiUrl}/api/v${version}/login/access-token`, authForm));
  }

  public sendRecoverRequest(data: FormGroup): Promise<IMessage>{
    return lastValueFrom(this._http.post<IMessage>(`${environment.apiUrl}/recover_password`, data))
  }

  public validateToken(data: FormGroup): Promise<IMessage>{
    return lastValueFrom(this._http.post<IMessage>(`${environment.apiUrl}/recover_password/validate`, data))
  }

  public recoverPassword(data: FormGroup): Promise<IMessage>{
    return lastValueFrom(this._http.post<IMessage>(`${environment.apiUrl}/recover_password/update_password`, data))
  }

  public setAccessToken(token: string): void {
    localStorage.setItem(APP_ACCESS_TOKEN, token);
  }

  public getAccessToken(): string {
    return localStorage.getItem(APP_ACCESS_TOKEN)??"";
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem(APP_REFRESH_TOKEN, token);
  }

  public getRefreshToken(): string {
    return localStorage.getItem(APP_REFRESH_TOKEN)??"";
  }

  public setUserId(userId: number): void {
    localStorage.setItem(USER_ID, `${userId}`);
  }

  public getUserId(): string {
    return localStorage.getItem(USER_ID)??"";
  }

  public isLogged(): boolean {
    return localStorage.getItem(APP_ACCESS_TOKEN) !== null;
  }

  public setUser(authRes: IAuthReponse): void {
    this._currentUser.setUser(authRes.user);
    this.setAccessToken(authRes.access_token);
  }

  public logout(stateUrl?: string): void {
    localStorage.clear();
    this._currentUser.resetUser();
    this._router.navigate(['/login'], {
      queryParams: stateUrl?{ fromUrl: stateUrl }:{}
    });
  }
}
