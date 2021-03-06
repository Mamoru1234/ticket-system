import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherGroupsPageComponent } from './teacher-groups-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingModule } from '../../../components/landing/landing.module';
import { LoaderModule } from '../../../components/loader/loader.module';

const routes: Routes = [
  {
    path: '',
    component: TeacherGroupsPageComponent,
  },
];

@NgModule({
  declarations: [TeacherGroupsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LandingModule,
    LoaderModule,
  ],
})
export class TeacherGroupsPageModule { }
