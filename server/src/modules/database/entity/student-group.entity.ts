import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupTeacherEntity } from './group-teacher.entity';
import { LessonEntity } from './lesson.entity';

@Entity('studentGroup')
export class StudentGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => LessonEntity, 'group', {
    lazy: true
  })
  lessons!: Promise<LessonEntity[]>;

  @OneToMany(() => GroupTeacherEntity, 'group', {
    lazy: true,
  })
  teachers!: Promise<GroupTeacherEntity[]>;
}
