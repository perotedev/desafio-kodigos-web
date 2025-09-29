import { Injectable, InjectionToken, signal, Signal, WritableSignal} from '@angular/core';
import {IUser} from '../interfaces/IUser';

export const CURRENT_USER = new InjectionToken<Signal<IUser>>('CURRENT_USER');
const EMPTY_USER: IUser = {
  email: "",
  people: {
    name: "",
    birth: ""
  },
  role: "",
  userConfig: {
    theme: 'light',
    expanded: true
  }
}

@Injectable({
  providedIn: 'root'
})
export class CurrentUser {
  private readonly _currentUser: WritableSignal<IUser> = signal(EMPTY_USER);

  get currentUser(): Signal<IUser> {
    return this._currentUser;
  }

  public setUser(user: IUser): void {
    this._currentUser.set(user);
  }

  public resetUser(): void {
    this._currentUser.set(EMPTY_USER);
  }

  public getUserInitials(): string {
    const userName = this._currentUser().people.name;
    if (userName === "") return "US";

    const names = userName.split(' ');
    return names.length > 1 ? `${names[0][0]}${names.at(-1)![0]}` : names[0][0];
  }
}
