import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupPageComponent } from './create-group-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingModule } from '../../../components/landing/landing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerErrorContainerModule } from '../../../components/server-error-container/server-error-container.module';

const routes: Routes = [
  {
    path: '',
    component: CreateGroupPageComponent,
  }
];

@NgModule({
  declarations: [CreateGroupPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LandingModule,
    ReactiveFormsModule,
    ServerErrorContainerModule,
  ],
})
export class CreateGroupPageModule { }
