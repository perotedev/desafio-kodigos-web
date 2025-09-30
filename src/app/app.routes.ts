import { Routes } from '@angular/router';
import {environment} from '../environments/environment';
import {authGuard, homeAuthGuard, loginAuthGuard} from './core/auth/auth-guards';
import {RoleEnum} from './shared/enums/RoleEnum';

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
      {
        path: "recover-password",
        title: `${PREFIX} - Recuperar Senha`,
        loadComponent: () => import("./modules/login/login-recover-password/login-recover-password").then(m => m.LoginRecoverPassword),
        canActivate: [loginAuthGuard]
      },
      {
        path: "signup",
        title: `${PREFIX} - Cadastro`,
        loadComponent: () => import("./modules/login/login-signup/login-signup").then(m => m.LoginSignup),
        canActivate: [loginAuthGuard]
      }
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
        loadComponent: () => import("./modules/dash-home/dash-home").then(m => m.DashHome),
        canActivate: [authGuard],
        data: {
          roles: []
        }
      },
      {
        path: "service-order",
        title: `${PREFIX} - Ordens de Serviço`,
        children: [
          {
            path: "",
            title: `${PREFIX} - Ordens de Serviço`,
            loadComponent: () => import("./modules/service-order/service-order-home/service-order-home").then(m => m.ServiceOrderHome),
            canActivate: [authGuard],
            data: {
              roles: []
            }
          },
          {
            path: "view/:id",
            title: `${PREFIX} - Ver Ordem de Serviço`,
            loadComponent: () => import("./modules/service-order/service-order-view/service-order-view").then(m => m.ServiceOrderView),
            canActivate: [authGuard],
            data: {
              roles: []
            }
          },
          {
            path: "create",
            title: `${PREFIX} - Cadastrar Ordem de Serviço`,
            loadComponent: () => import("./modules/service-order/service-order-form/service-order-form").then(m => m.ServiceOrderForm),
            canActivate: [authGuard],
            data: {
              roles: []
            }
          }
        ]
      },
      {
        path: "user",
        title: `${PREFIX} - Usuários`,
        loadComponent: () => import("./modules/user/user-home/user-home").then(m => m.UserHome),
        canActivate: [authGuard],
        data: {
          roles: [RoleEnum.ADMIN]
        }
      }
    ]
  },
  {
    path: "**",
    title: `${PREFIX} - Página Não Encontrada`,
    loadComponent: () => import("./core/page-not-found/page-not-found").then(m => m.PageNotFound)
  }
];
