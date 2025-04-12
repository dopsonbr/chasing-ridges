import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadChildren: () => import('@chasing-ridges/home').then(m => m.homeRoutes)
  },
  {
    path: 'products',
    loadChildren: () => import('@chasing-ridges/product-search').then(m => m.productSearchRoutes)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
