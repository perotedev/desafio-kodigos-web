import { Injectable, InjectionToken, signal, Signal, WritableSignal} from '@angular/core';
import {IUser} from '../interfaces/IUser';
import {RoleEnum} from '../enums/RoleEnum';

export const CURRENT_USER = new InjectionToken<Signal<IUser>>('CURRENT_USER');
const EMPTY_USER: IUser = {
  email: "user@gmail.com",
  active: true,
  person_id: 1,
  person: {
    name: "Usuário Teste",
    birth: "10/05/2001"
  },
  role: RoleEnum.USER,
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
    const userName = this._currentUser().person.name;
    if (userName === "") return "US";

    const names = userName.split(' ');
    return names.length > 1 ? `${names[0][0]}${names.at(-1)![0]}` : names[0][0];
  }
}
