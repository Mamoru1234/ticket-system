import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupPageComponent } from './group-page.component';
import { LandingModule } from '../../../components/landing/landing.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GroupPageComponent,
  },
];

@NgModule({
  declarations: [GroupPageComponent],
  imports: [
    CommonModule,
    LandingModule,
    RouterModule.forChild(routes),
  ]
})
export class GroupPageModule { }
