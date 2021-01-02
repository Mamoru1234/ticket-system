import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { LessonEntity } from './lesson.entity';

@Entity('lessonVisit')
export class LessonVisitEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => LessonEntity)
  @JoinColumn()
  lesson!: LessonEntity;

  @Column('lessonId')
  lessonId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  student!: UserEntity;

  @Column('studentId')
  studentId!: number;
}
