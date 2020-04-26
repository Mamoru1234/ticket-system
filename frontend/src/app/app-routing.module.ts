import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckinComponent } from './routes/checkin/checkin.component';
import { MainComponent } from './routes/main/main.component';
import { GroupsComponent } from './routes/groups/groups.component';
import { StudentsComponent } from './routes/students/students.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'checkin',
    component: CheckinComponent,
  },
  {
    path: 'groups',
    component: GroupsComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
