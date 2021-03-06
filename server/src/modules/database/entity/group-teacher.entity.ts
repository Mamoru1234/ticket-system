import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentGroupEntity } from './student-group.entity';
import { UserEntity } from './user.entity';

@Entity('studentGroupTeachers')
export class GroupTeacherEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => StudentGroupEntity, 'teachers')
  @JoinColumn({name: 'groupId'})
  group!: StudentGroupEntity;

  @Column('groupId')
  groupId!: string;

  @ManyToOne(() => UserEntity, 'teacher')
  @JoinColumn({name: 'teacherId'})
  teacher!: UserEntity;

  @Column('teacherId')
  teacherId: number;
}
