import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { AppHeaderModule } from '../app-header/app-header.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppHeaderModule,
  ],
  exports: [
    LandingComponent,
  ],
})
export class LandingModule { }
