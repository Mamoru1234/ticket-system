import { GroupMemberDao } from './group-member.dao';
import { GroupTeacherDao } from './group-teacher.dao';
import { StudentGroupDao } from './student-group.dao';
import { UserDao } from './user.dao';
import { LessonDao } from './lesson.dao';
import { LessonVisitDao } from './lesson-visit.dao';
import { TicketDao } from './ticket.dao';

export const DAO_LIST = [
  GroupMemberDao,
  GroupTeacherDao,
  StudentGroupDao,
  UserDao,
  LessonDao,
  LessonVisitDao,
  TicketDao,
];
