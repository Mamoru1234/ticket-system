import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page.component';
import { UsersPageRoutes } from './users-page.routing';
import { LandingModule } from '../../components/landing/landing.module';

@NgModule({
  declarations: [UsersPageComponent],
  imports: [
    CommonModule,
    UsersPageRoutes,
    LandingModule,
  ],
})
export class UsersPageModule { }
