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
    title: `${PREFIX} - Login`,
    loadComponent: () => import("./modules/login/login-home/login-home").then(m => m.LoginHome),
    canActivate: []
  },
  {
    path: "",
    title: `${PREFIX} - Início`,
    loadComponent: () => import("./core/home/home").then(m => m.Home),
    canActivate: [],
    children: [
      {
        path: "home",
        title: `${PREFIX} - Início`,
        loadComponent: () => import("./modules/service-order/service-order-home/service-order-home").then(m => m.ServiceOrderHome),
        canActivate: []
      }
    ]
  },
  {
    path: "**",
    title: `${PREFIX} - Página Não Encontrada`,
    loadComponent: () => import("./core/page-not-found/page-not-found").then(m => m.PageNotFound)
  }
];
