import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonSchedulePageComponent } from './lesson-schedule-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingModule } from '../../../components/landing/landing.module';
import { ServerErrorContainerModule } from '../../../components/server-error-container/server-error-container.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { InputWrapperModule } from '../../../components/input-wrapper/input-wrapper.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: LessonSchedulePageComponent,
  }
];

@NgModule({
  declarations: [LessonSchedulePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LandingModule,
    ServerErrorContainerModule,
    MatCardModule,
    ReactiveFormsModule,
    InputWrapperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
  ],
})
export class LessonSchedulePageModule { }
