import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'activate/:userId',
        loadChildren: () => import('./activate-user-page/activate-user-page.module').then((m) => m.ActivateUserPageModule),
      },
    ],
  }
];

export const UsersPageRouting = RouterModule.forChild(routes);
