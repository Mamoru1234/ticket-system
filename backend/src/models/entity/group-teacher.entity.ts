import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentGroupEntity } from './student-group.entity';
import { UserEntity } from './user.entity';

@Entity('studentGroupTeachers')
export class GroupTeacherEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => StudentGroupEntity, 'teachers')
  @JoinColumn({name: 'groupId'})
  group!: StudentGroupEntity;

  @ManyToOne(() => UserEntity, 'teacher')
  @JoinColumn()
  teacher!: UserEntity;
}
