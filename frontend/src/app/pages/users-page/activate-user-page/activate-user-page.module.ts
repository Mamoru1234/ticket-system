import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateUserPageComponent } from './activate-user-page.component';
import { ActivateUserPageRouting } from './activate-user-page.routing';
import { LandingModule } from '../../../components/landing/landing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputWrapperModule } from '../../../components/input-wrapper/input-wrapper.module';

@NgModule({
  declarations: [ActivateUserPageComponent],
  imports: [
    CommonModule,
    ActivateUserPageRouting,
    LandingModule,
    ReactiveFormsModule,
    InputWrapperModule,
  ],
})
export class ActivateUserPageModule { }
