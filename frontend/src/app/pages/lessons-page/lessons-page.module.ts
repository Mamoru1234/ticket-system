import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleGuard } from '../../guards/user-role.guard';
import { UserRole } from '../../services/rest-api/dto/user.endpoint';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'group/:groupId',
        loadChildren: () => import('./group-lessons-page/group-lessons-page.module').then((m) => m.GroupLessonsPageModule),
        canActivate: [UserRoleGuard],
        data: {
          requiredRole: UserRole.TEACHER,
        },
      },
    ],
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class LessonsPageModule { }
