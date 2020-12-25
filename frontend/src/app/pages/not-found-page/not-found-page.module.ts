import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page.component';
import { NotFoundPageRouting } from './not-found-page.routing';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [
    CommonModule,
    NotFoundPageRouting,
  ],
})
export class NotFoundPageModule { }
