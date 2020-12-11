import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header.component';

@NgModule({
  declarations: [AppHeaderComponent],
  exports: [
    AppHeaderComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class AppHeaderModule { }
