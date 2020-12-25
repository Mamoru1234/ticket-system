import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { LandingModule } from '../../components/landing/landing.module';
import { MainPageRouting } from './main-page.routing';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    LandingModule,
    MainPageRouting,
  ]
})
export class MainPageModule { }
