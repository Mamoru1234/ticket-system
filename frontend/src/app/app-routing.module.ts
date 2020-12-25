import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleGuard } from './guards/user-role.guard';
import { UserRole } from './services/rest-api/dto/user.endpoint';
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
    ],
    canActivate: [AuthGuard],
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
