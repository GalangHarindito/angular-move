import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FouderComponent } from './pages/about/fouder/fouder.component';
import { SignupComponent } from './pages/signup/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
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

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
