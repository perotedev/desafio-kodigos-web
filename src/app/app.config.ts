import {
  ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom, LOCALE_ID,
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
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {FILE_TRANSFER, FileTransferService} from './shared/services/file-transfer';
import localePt from '@angular/common/locales/pt'
import {registerLocaleData} from '@angular/common';
import {NgxUiLoaderConfig, NgxUiLoaderModule} from 'ngx-ui-loader';

registerLocaleData(localePt)

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  masterLoaderId: "appOsLoader",
  overlayColor: "rgba(0, 0, 0, 0.4)",
  pbThickness: 2,
  pbColor: "#ffffff",
  fgsType: "three-strings",
  fgsColor: "#ffffff"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptorFn]), withFetch()),
    importProvidersFrom(ToastModule, NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)),
    provideRouter(routes),
    provideAnimationsAsync(),
    MessageService,
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
    },
    {
      provide: FILE_TRANSFER,
      useFactory: (fileTransferService: FileTransferService) => {
        return fileTransferService.fileTransfer;
      },
      deps: [FileTransferService]
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ]
};
