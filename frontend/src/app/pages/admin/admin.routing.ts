import { RouterModule, Routes } from '@angular/router';
import { UserRoleGuard } from '../../guards/user-role.guard';
import { UserRole } from '../../services/rest-api/dto/user.endpoint';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        loadChildren: () => import('./users-page/users-page.module').then(m => m.UsersPageModule),
      },
      {
        path: 'create-user',
        loadChildren: () => import('./create-user-page/create-user-page.module').then(m => m.CreateUserPageModule),
      }
    ],
    canActivate: [UserRoleGuard],
    data: {
      requiredRole: UserRole.ADMIN,
    },
  }
];

export const AdminRouting = RouterModule.forChild(routes);
