import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentGroupEntity } from './student-group.entity';
import { UserEntity } from './user.entity';

@Entity('studentGroupMembers')
export class GroupMemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => StudentGroupEntity, 'members')
  @JoinColumn({name: 'groupId'})
  group!: StudentGroupEntity;

  @Column('groupId')
  groupId!: string;

  @ManyToOne(() => UserEntity, 'participate')
  @JoinColumn()
  student!: UserEntity;

  @Column('studentId')
  studentId!: string;
}
