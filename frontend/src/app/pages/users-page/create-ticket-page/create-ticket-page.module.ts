import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTicketPageComponent } from './create-ticket-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingModule } from '../../../components/landing/landing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputWrapperModule } from '../../../components/input-wrapper/input-wrapper.module';
import { ServerErrorContainerModule } from '../../../components/server-error-container/server-error-container.module';

const routes: Routes = [
  {
    path: '',
    component: CreateTicketPageComponent,
  },
];

@NgModule({
  declarations: [CreateTicketPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LandingModule,
    ReactiveFormsModule,
    InputWrapperModule,
    ServerErrorContainerModule,
  ],
})
export class CreateTicketPageModule { }
