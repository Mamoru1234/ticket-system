import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/main-page/main-page.module').then((m) => m.MainPageModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users-page/users-page.module').then((m) => m.UsersPageModule),
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'set-password',
    loadChildren: () => import('./pages/set-password-page/set-password-page.module').then(m => m.SetPasswordPageModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password-page/forgot-password-page.module').then(m => m.ForgotPasswordPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found-page/not-found-page.module').then((m) => m.NotFoundPageModule),
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
