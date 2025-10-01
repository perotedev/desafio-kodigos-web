import {Component, computed, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {routes} from '../../app.routes';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {environment} from '../../../environments/environment';
import {CURRENT_USER} from '../../shared/services/current-user';
import {Button} from 'primeng/button';
import {IS_MOBILE} from '../../shared/services/is-mobile';
import {HeaderBarService} from '../header-bar/header-bar-service';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';

interface IRoute {
  path: string;
  title?: string;
  children?: IRoute[];
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.html',
  imports: [
    Button,
    BreadcrumbModule
  ],
  styleUrl: './breadcrumb.scss'
})
export class Breadcrumb implements OnInit {
  @ViewChild('backButton') private _backButton!: TemplateRef<any>;
  private readonly _appRoutes = routes;
  private readonly _router = inject(Router);
  private readonly _headerBarService: HeaderBarService = inject(HeaderBarService);
  private readonly _currentUser = inject(CURRENT_USER);
  private readonly _location = inject(Location);
  private readonly _prefix: string = `${environment.prefix} ${environment.appName} - `;
  public readonly isMobile = inject(IS_MOBILE);
  public currentTitle: string = '';
  public currentRoute: string = '';
  public routeList: IRoute[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  itens: MenuItem[] = [];

  constructor() {
    this._router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        this.setup();

        if (this.routeList.length > 2) {
          this._headerBarService.setTemplateBefore(this._backButton);
        }
      }
    });
  }

  private setup(): void {
    this.routeList = [{path: '/', title: 'Início'}];
    const currentUrl = this.normalizeUrl(this._router.url);

    const findRouteRecursively = (routes: IRoute[], currentPath: string = '', breadcrumbs: IRoute[] = []): boolean => {
      for (const route of routes) {
        const routePath = this.normalizeRoutePath(route.path);
        const fullPath = this.buildFullPath(currentPath, routePath);

        if (routePath) {
          breadcrumbs.push(this.createBreadcrumb(routePath, route.title?.replace(this._prefix, '')));
        }

        if (this.isCurrentRoute(fullPath, currentUrl)) {
          if (currentUrl === '/home') {
            this.currentTitle = `Bem vindo, ${this._currentUser().person.name.split(' ')[0]}!`
          } else {
            this.routeList.push(...breadcrumbs);
            this.currentTitle = route.title?.toString().replace(this._prefix, '') || '';
          }
          this.currentRoute = currentUrl;
          this.itens = breadcrumbs.map((breadcrumb: IRoute, index: number): MenuItem => {
            return {
              label: breadcrumb.title,
              routerLink: this.getFullPath(index)
            }
          });
          // this.itens[this.itens.length - 1].routerLink = undefined;
          return true;
        }

        if (route.children?.length) {
          const found = findRouteRecursively(route.children, fullPath, [...breadcrumbs]);
          if (found) return true;
        }

        if (routePath) breadcrumbs.pop();
      }

      return false;
    };

    findRouteRecursively(this._appRoutes as IRoute[]);
  }


  private normalizeUrl(url: string): string {
    const parts = url.split('/');
    if (/^\d+$/.test(parts[parts.length - 1])) {
      parts.pop(); // remove id numérico
    }
    return parts.join('/');
  }

  private normalizeRoutePath(path: string): string {
    const parts = path.split('/');
    if (parts[parts.length - 1] === ':id') {
      parts.pop(); // remove :id
    }
    return parts.join('/');
  }

  private buildFullPath(currentPath: string, path: string): string {
    return path ? (currentPath ? `${currentPath}/${path}` : path) : currentPath;
  }

  private createBreadcrumb(path: string, title?: string): IRoute {
    return {
      path: path,
      title: title?.toString() || ''
    };
  }

  private isCurrentRoute(routePath: string, currentUrl: string): boolean {
    return routePath !== undefined && `/${routePath}` === currentUrl;
  }

  public ngOnInit(): void {
    this.setup();

    setTimeout(() => {
      if (this.routeList.length > 2) {
        this._headerBarService.setTemplateBefore(this._backButton);
      }
    }, 200)
  }

  public getFullPath(index: number): string {
    return this.routeList
      .slice(1, index-1)
      .map(route => route.path)
      .join('/');
  }

  public goBack(): void {
    this._location.back();
  }
}
