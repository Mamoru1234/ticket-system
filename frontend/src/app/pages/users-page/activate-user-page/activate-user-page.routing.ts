import { RouterModule, Routes } from '@angular/router';
import { ActivateUserPageComponent } from './activate-user-page.component';

const routes: Routes = [
  {
    path: '',
    component: ActivateUserPageComponent,
  }
];

export const ActivateUserPageRouting = RouterModule.forChild(routes);
