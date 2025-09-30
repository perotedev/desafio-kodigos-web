import {Component, inject, OnInit} from '@angular/core';
import {routes} from '../../app.routes';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {environment} from '../../../environments/environment';
import {CURRENT_USER} from '../../shared/services/current-user';

interface IRoute {
  path: string;
  title?: string;
  children?: IRoute[];
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss'
})
export class Breadcrumb implements OnInit {
  private readonly _appRoutes = routes;
  private readonly _router = inject(Router);
  private readonly _currentUser = inject(CURRENT_USER);
  private readonly _location = inject(Location);
  private readonly _prefix: string = `${environment.prefix} ${environment.appName} - `
  public currentTitle: string = '';
  public routeList: IRoute[] = [];

  constructor() {
    this._router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        this.setup();
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
    console.log(this.routeList);
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
  }

  public navigateTo(index: number): void {
    const path = this.routeList
      .slice(1, index + 1)
      .map(route => route.path)
      .join('/');
    this._router.navigate([path]);
  }
}
