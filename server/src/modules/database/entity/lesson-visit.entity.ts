import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { LessonEntity } from './lesson.entity';
import { TicketEntity } from './ticket.entity';

@Entity('lessonVisit')
export class LessonVisitEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => LessonEntity)
  @JoinColumn()
  lesson!: LessonEntity;

  @Column('lessonId')
  lessonId!: string;

  @ManyToOne(() => TicketEntity)
  @JoinColumn()
  ticket!: TicketEntity;

  @Column('ticketId')
  ticketId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  student!: UserEntity;

  @Column('studentId')
  studentId!: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  markedBy!: UserEntity;

  @Column('markedById')
  markedById!: number;
}
