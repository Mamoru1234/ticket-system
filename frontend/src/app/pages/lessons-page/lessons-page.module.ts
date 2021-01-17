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
        path: 'create/:groupId',
        loadChildren: () => import('./lesson-create-page/lesson-create-page.module').then(m => m.LessonCreatePageModule),
        canActivate: [UserRoleGuard],
        data: {
          requiredRole: UserRole.TEACHER,
        },
      },
      {
        path: 'schedule/:groupId',
        loadChildren: () => import('./lesson-schedule-page/lesson-schedule-page.module').then(m => m.LessonSchedulePageModule),
        canActivate: [UserRoleGuard],
        data: {
          requiredRole: UserRole.TEACHER,
        },
      },
      {
        path: 'manage/:lessonId',
        loadChildren: () => import('./lesson-page/lesson-page.module').then(m => m.LessonPageModule),
        canActivate: [UserRoleGuard],
        data: {
          requiredRole: UserRole.TEACHER,
        },
      }
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
