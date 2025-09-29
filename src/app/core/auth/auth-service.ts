import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {Router} from '@angular/router';
import { FormGroup } from '@angular/forms';
import {IAuthLogin} from '../../shared/interfaces/IAuth';
import {environment} from '../../../environments/environment';
import {ILoginResponse} from '../../shared/interfaces/ILoginResponse';
import {IMessage} from '../../shared/interfaces/IMessage';

export const APP_ACCESS_TOKEN: string = "appToken";
export const APP_REFRESH_TOKEN: string = "appRefreshToken";

export const USER_ID: string = "appUserId";
export const USER_ROLE: string = "appUserRole";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  public login(form: IAuthLogin): Promise<ILoginResponse> {
    return lastValueFrom(this.http.post<ILoginResponse>(`${environment.apiUrl}/auth`,form))
  }

  public sendRecoverRequest(data: FormGroup): Promise<IMessage>{
    return lastValueFrom(this.http.post<IMessage>(`${environment.apiUrl}/recover_password`, data))
  }

  public validateToken(data: FormGroup): Promise<IMessage>{
    return lastValueFrom(this.http.post<IMessage>(`${environment.apiUrl}/recover_password/validate`, data))
  }

  public recoverPassword(data: FormGroup): Promise<IMessage>{
    return lastValueFrom(this.http.post<IMessage>(`${environment.apiUrl}/recover_password/update_password`, data))
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

  public setUserId(userId: string): void {
    localStorage.setItem(USER_ID, userId);
  }

  public getUserId(): string {
    return localStorage.getItem(USER_ID)??"";
  }

  public setRole(role: string): void {
    localStorage.setItem(USER_ROLE, role);
  }

  public getRole(): string {
    return localStorage.getItem(USER_ROLE)??"";
  }

  public isLogged(): boolean {
    return localStorage.getItem(APP_ACCESS_TOKEN) !== null;
  }

  public logout(stateUrl?: string): void {
    localStorage.clear();
    this.router.navigate(['/login'], {
      queryParams: stateUrl?{ fromUrl: stateUrl }:{}
    });
  }
}
