import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordPageComponent } from './forgot-password-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InputWrapperModule } from '../../components/input-wrapper/input-wrapper.module';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPageComponent,
  }
];

@NgModule({
  declarations: [ForgotPasswordPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    InputWrapperModule,
  ],
})
export class ForgotPasswordPageModule { }
