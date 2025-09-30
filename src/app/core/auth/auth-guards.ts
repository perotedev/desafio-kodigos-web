import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from './auth-service';
import {ToastService} from '../../shared/services/toast';
import {CURRENT_USER} from '../../shared/services/current-user';

export const loginAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const hasToken: boolean = authService.getAccessToken() !== ""

  if (hasToken) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};

export const homeAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const hasToken: boolean = authService.getAccessToken() !== '';

  if (hasToken) return true;

  authService.logout(state.url);
  return false;
};

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const toast: ToastService = inject(ToastService);
  const currentUser = inject(CURRENT_USER);

  const expectedRoles: string[] = route.data['roles'] ?? [];
  if (expectedRoles.length === 0) return true;

  const userRole: string = currentUser().role;

  const hasRole: boolean = expectedRoles.includes(userRole);
  if (hasRole) return true;

  toast.showToastInfo("Você não tem permissão para o acessar este módulo!");
  router.navigate(["/not-found"]);
  return false;
};
