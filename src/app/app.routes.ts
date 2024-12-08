import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FouderComponent } from './pages/about/fouder/fouder.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  {
    path: 'home',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then((m) => m.ProductsComponent),
      },
      {
        path: 'plans',
        loadComponent: () =>
          import('./pages/plans/plans.component').then((m) => m.PlansComponent),
      },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [authGuard],
    // canActivateChild:[authGuardChildren],
    // children: [
    //   {
    //     path: '',
    //     loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    //   }
    // ]
  },
  
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];


