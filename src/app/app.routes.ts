import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FouderComponent } from './pages/about/fouder/fouder.component';
import { SignupComponent } from './pages/signup/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/profile/profile.component').then(m => m.ProfileComponent),
      }
    ]
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
    children: [
      {
        path: 'founders',
        title: 'About Founders',
        component: FouderComponent,
      },
    ],
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
