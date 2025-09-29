import { Routes } from '@angular/router';
import {environment} from '../environments/environment';
import {authGuard, homeAuthGuard, loginAuthGuard} from './core/auth/auth-guards';

const PREFIX = `${environment.prefix} ${environment.appName}`;

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "",
    title: `${PREFIX}`,
    loadComponent: () => import("./modules/login/login-home/login-home").then(m => m.LoginHome),
    children: [
      {
        path: "login",
        title: `${PREFIX} - Login`,
        loadComponent: () => import("./modules/login/login-signin/login-signin").then(m => m.LoginSignin),
        canActivate: [loginAuthGuard]
      },
    ]
  },
  {
    path: "",
    title: `${PREFIX} - Início`,
    loadComponent: () => import("./core/home/home").then(m => m.Home),
    canActivate: [homeAuthGuard],
    children: [
      {
        path: "home",
        title: `${PREFIX} - Início`,
        loadComponent: () => import("./modules/service-order/service-order-home/service-order-home").then(m => m.ServiceOrderHome),
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: "**",
    title: `${PREFIX} - Página Não Encontrada`,
    loadComponent: () => import("./core/page-not-found/page-not-found").then(m => m.PageNotFound)
  }
];
