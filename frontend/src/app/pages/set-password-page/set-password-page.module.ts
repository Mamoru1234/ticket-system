import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetPasswordPageComponent } from './set-password-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SetPasswordPageComponent,
  },
];

@NgModule({
  declarations: [SetPasswordPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class SetPasswordPageModule { }
