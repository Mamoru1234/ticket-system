import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundPageComponent,
  },
];

export const NotFoundPageRouting = RouterModule.forChild(routes);
