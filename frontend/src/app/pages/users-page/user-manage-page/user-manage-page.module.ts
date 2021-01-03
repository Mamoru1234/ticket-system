import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagePageComponent } from './user-manage-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingModule } from '../../../components/landing/landing.module';
import { LoaderModule } from '../../../components/loader/loader.module';
import { ServerErrorContainerModule } from '../../../components/server-error-container/server-error-container.module';

const routes: Routes = [
  {
    path: '',
    component: UserManagePageComponent,
  }
];

@NgModule({
  declarations: [UserManagePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LandingModule,
    LoaderModule,
    ServerErrorContainerModule,
  ],
})
export class UserManagePageModule { }
