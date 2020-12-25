import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserPageComponent } from './create-user-page.component';
import { CreateUserPageRouting } from './create-user-page.routing';
import { LandingModule } from '../../../components/landing/landing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateUserPageComponent],
  imports: [
    CommonModule,
    CreateUserPageRouting,
    LandingModule,
    ReactiveFormsModule,
  ]
})
export class CreateUserPageModule { }
