import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupLessonsPageComponent } from './group-lessons-page.component';
import { LandingModule } from '../../../components/landing/landing.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GroupLessonsPageComponent,
  },
];

@NgModule({
  declarations: [GroupLessonsPageComponent],
  imports: [
    CommonModule,
    LandingModule,
    RouterModule.forChild(routes),
  ]
})
export class GroupLessonsPageModule { }
