import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonCreatePageComponent } from './lesson-create-page.component';
import { LandingModule } from '../../../components/landing/landing.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LessonCreatePageComponent,
  },
];

@NgModule({
  declarations: [LessonCreatePageComponent],
  imports: [
    CommonModule,
    LandingModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
})
export class LessonCreatePageModule { }
