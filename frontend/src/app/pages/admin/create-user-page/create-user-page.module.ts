import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserPageComponent } from './create-user-page.component';
import { CreateUserPageRouting } from './create-user-page.routing';
import { LandingModule } from '../../../components/landing/landing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [CreateUserPageComponent],
  imports: [
    CommonModule,
    CreateUserPageRouting,
    LandingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class CreateUserPageModule { }