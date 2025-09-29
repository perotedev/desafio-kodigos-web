import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import {IsMobile} from './shared/services/is-mobile';
import {CurrentUser} from './shared/services/current-user';
import {AppTheme} from './shared/services/app-theme';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {authInterceptorFn} from './core/auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptorFn]), withFetch()),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark-mode'
        }
      }
    }),
    {
      provide: 'IS_MOBILE',
      useFactory: (isMobileService: IsMobile) => {
        return isMobileService.isMobile;
      },
      deps: [IsMobile]
    },
    {
      provide: 'CURRENT_USER',
      useFactory: (currentUserService: CurrentUser) => {
        return currentUserService.currentUser;
      },
      deps: [CurrentUser]
    },
    {
      provide: 'IS_DARK_MODE',
      useFactory: (appThemeService: AppTheme) => {
        return appThemeService.isDarkMode;
      },
      deps: [AppTheme]
    }
  ]
};
