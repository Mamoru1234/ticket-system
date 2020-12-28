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
        path: 'teacher',
        loadChildren: () => import('./teacher-groups-page/teacher-groups-page.module').then(m => m.TeacherGroupsPageModule),
        canActivate: [UserRoleGuard],
        data: {
          requiredRole: UserRole.TEACHER,
        },
      },
      {
        path: 'create',
        loadChildren: () => import('./create-group-page/create-group-page.module').then(m => m.CreateGroupPageModule),
        canActivate: [UserRoleGuard],
        data: {
          requiredRole: UserRole.TEACHER,
        },
      },
      {
        path: ':groupId',
        loadChildren: () => import('./group-page/group-page.module').then((m) => m.GroupPageModule),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class GroupsPageModule { }
