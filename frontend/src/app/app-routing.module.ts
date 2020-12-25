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
        path: 'admin',
        children: [
          {
            path: 'users',
            loadChildren: () => import('./pages/users-page/users-page.module').then(m => m.UsersPageModule),
          },
        ],
        canActivate: [UserRoleGuard],
        data: {
          requiredRole: UserRole.ADMIN,
        },
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
