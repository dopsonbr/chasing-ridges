import { Route } from '@angular/router';
import { homeRoutes } from '@chasing-ridges/home';

export const appRoutes: Route[] = [
  {
    path: 'home',
    children: homeRoutes,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
