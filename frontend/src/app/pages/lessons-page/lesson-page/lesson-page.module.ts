import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonPageComponent } from './lesson-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingModule } from '../../../components/landing/landing.module';
import { LoaderModule } from '../../../components/loader/loader.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputWrapperModule } from '../../../components/input-wrapper/input-wrapper.module';
import { ServerErrorContainerModule } from '../../../components/server-error-container/server-error-container.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path: '',
    component: LessonPageComponent,
  }
];

@NgModule({
  declarations: [LessonPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LandingModule,
    LoaderModule,
    ReactiveFormsModule,
    InputWrapperModule,
    ServerErrorContainerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class LessonPageModule { }
