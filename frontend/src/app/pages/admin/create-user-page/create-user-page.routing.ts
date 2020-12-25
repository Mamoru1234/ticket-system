import { RouterModule, Routes } from '@angular/router';
import { CreateUserPageComponent } from './create-user-page.component';

const routes: Routes = [
  {
    path: '',
    component: CreateUserPageComponent,
  },
];

export const CreateUserPageRouting = RouterModule.forChild(routes);
