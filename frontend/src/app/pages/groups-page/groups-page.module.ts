import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsPageComponent } from './groups-page.component';
import { GroupsPageRoutes } from './groups-page.routing';

@NgModule({
  declarations: [GroupsPageComponent],
  imports: [
    CommonModule,
    GroupsPageRoutes,
  ]
})
export class GroupsPageModule { }
