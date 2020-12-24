import { GroupMemberDao } from './group-member.dao';
import { GroupTeacherDao } from './group-teacher.dao';
import { StudentGroupDao } from './student-group.dao';
import { UserDao } from './user.dao';

export const DAO_LIST = [
  GroupMemberDao,
  GroupTeacherDao,
  StudentGroupDao,
  UserDao,
];
