import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NUMERIC_TRANSFORMER_INSTANCE } from '../transformer/numeric.transformer';
import { UserEntity } from './user.entity';

@Entity('ticket')
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('bigint', {
    transformer: NUMERIC_TRANSFORMER_INSTANCE,
    default: 0,
  })
  createdTimestamp: number;

  @Column('bigint', {
    transformer: NUMERIC_TRANSFORMER_INSTANCE,
    default: 0,
  })
  validFromTimestamp: number;

  @Column('bigint', {
    transformer: NUMERIC_TRANSFORMER_INSTANCE,
    default: 0,
  })
  validToTimestamp: number;

  @Column('int', {
    default: 0,
  })
  visitsLeft: number;

  @Column('int', {
    default: 0,
  })
  visitsTotal: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'createdById'})
  createdBy!: UserEntity;

  @Column('createdById')
  createdById: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  student!: UserEntity;

  @Column('studentId')
  studentId!: number;
}
