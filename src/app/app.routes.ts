import { Routes } from '@angular/router';
import {environment} from '../environments/environment';

const PREFIX = `${environment.prefix} ${environment.appName}`;

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "login",
    loadComponent: () => import("./modules/login/login-home/login-home").then(m => m.LoginHome),
    canActivate: []
  },
  {
    path: "",
    title: `${PREFIX} - Início`,
    loadComponent: () => import("./core/home/home").then(m => m.Home),
    canActivate: [],
    children: []
  }
];
