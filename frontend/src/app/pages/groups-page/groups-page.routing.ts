import { RouterModule, Routes } from '@angular/router';
import { GroupsPageComponent } from './groups-page.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsPageComponent,
  },
];

export const LoginPageRoutes = RouterModule.forChild(routes);
