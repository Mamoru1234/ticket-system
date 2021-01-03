import { RouterModule, Routes } from '@angular/router';
import { UserRoleGuard } from '../../guards/user-role.guard';
import { UserRole } from '../../services/rest-api/dto/user.endpoint';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'activate/:userId',
        loadChildren: () => import('./activate-user-page/activate-user-page.module').then((m) => m.ActivateUserPageModule),
      },
      {
        path: 'manage/:userId',
        loadChildren: () => import('./user-manage-page/user-manage-page.module').then(m => m.UserManagePageModule),
        canActivate: [UserRoleGuard],
        data: {
          requiredRole: UserRole.TEACHER,
        },
      },
      {
        path: 'tickets/create/:userId',
        loadChildren: () => import('./create-ticket-page/create-ticket-page.module').then(m => m.CreateTicketPageModule),
        canActivate: [UserRoleGuard],
        data: {
          requiredRole: UserRole.TEACHER,
        },
      }
    ],
  }
];

export const UsersPageRouting = RouterModule.forChild(routes);
