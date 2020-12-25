import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './users-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
  },
];

export const UsersPageRoutes = RouterModule.forChild(routes);
