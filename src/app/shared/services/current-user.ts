import { Injectable, InjectionToken, signal, Signal, WritableSignal} from '@angular/core';
import {IUser} from '../interfaces/IUser';

export const CURRENT_USER = new InjectionToken<Signal<IUser>>('CURRENT_USER');

const USER_KEY: string = 'appUser';
const EMPTY_USER: IUser = {} as IUser;

@Injectable({
  providedIn: 'root'
})
export class CurrentUser {
  private readonly _currentUser: WritableSignal<IUser> = signal(EMPTY_USER);

  get currentUser(): Signal<IUser> {
    return this._currentUser;
  }

  private setUserToLocalStorage(user: IUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserFromLocalStorage(): IUser {
    const user = localStorage.getItem(USER_KEY);
    return JSON.parse(user!) || EMPTY_USER;
  }

  public initUserInHome(): void {
    if (this._currentUser().person === undefined) {
      this._currentUser.set(this.getUserFromLocalStorage())
    }
  }

  public setUser(user: IUser): void {
    this._currentUser.set(user);
    this.setUserToLocalStorage(user);
  }

  public resetUser(): void {
    this._currentUser.set(EMPTY_USER);
  }

  public getUserInitials(): string {
    const userName = this._currentUser().person.name;
    if (userName === "") return "US";

    const names = userName.split(' ');
    return names.length > 1 ? `${names[0][0]}${names.at(-1)![0]}` : names[0][0];
  }
}
