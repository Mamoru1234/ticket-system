import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NUMERIC_TRANSFORMER_INSTANCE } from '../transformer/numeric.transformer';
import { StudentGroupEntity } from './student-group.entity';

@Entity('lesson')
export class LessonEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('bigint', {
    transformer: NUMERIC_TRANSFORMER_INSTANCE,
    default: 0,
  })
  timestamp: number;

  @ManyToOne(() => StudentGroupEntity, 'teachers')
  @JoinColumn({name: 'groupId'})
  group!: StudentGroupEntity;

  @Column('groupId')
  groupId!: string;
}
