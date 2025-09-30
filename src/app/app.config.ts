import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import {IS_MOBILE, IsMobile} from './shared/services/is-mobile';
import {CURRENT_USER, CurrentUser} from './shared/services/current-user';
import {AppTheme, IS_DARK_MODE} from './shared/services/app-theme';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {authInterceptorFn} from './core/auth/auth-interceptor';
import {AppOsTheme, AppOsTranslation} from '../primeng.theme';

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
        preset: AppOsTheme,
        options: {
          darkModeSelector: '.dark-mode'
        }
      },
      translation: AppOsTranslation
    }),
    {
      provide: IS_MOBILE,
      useFactory: (isMobileService: IsMobile) => {
        return isMobileService.isMobile;
      },
      deps: [IsMobile]
    },
    {
      provide: CURRENT_USER,
      useFactory: (currentUserService: CurrentUser) => {
        return currentUserService.currentUser;
      },
      deps: [CurrentUser]
    },
    {
      provide: IS_DARK_MODE,
      useFactory: (appThemeService: AppTheme) => {
        return appThemeService.isDarkMode;
      },
      deps: [AppTheme]
    }
  ]
};
