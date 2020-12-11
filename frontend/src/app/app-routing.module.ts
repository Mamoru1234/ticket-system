import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'groups',
        loadChildren: () => import('./pages/groups-page/groups-page.module').then(m => m.GroupsPageModule),
      },
    ],
    canActivate: [AuthGuardService],
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
