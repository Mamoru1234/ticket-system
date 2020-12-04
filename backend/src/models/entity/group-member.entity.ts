import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentGroupEntity } from './student-group.entity';
import { UserEntity } from './user.entity';

@Entity('studentGroupMembers')
export class GroupMemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => StudentGroupEntity, 'members')
  @JoinColumn({name: 'groupId'})
  group!: StudentGroupEntity;

  @ManyToOne(() => UserEntity, 'participate')
  @JoinColumn()
  student!: UserEntity;
}
