import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupMemberEntity } from './group-member.entity';
import { GroupTeacherEntity } from './group-teacher.entity';

@Entity('studentGroup')
export class StudentGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => GroupMemberEntity, 'group')
  members!: GroupMemberEntity[];

  @OneToMany(() => GroupTeacherEntity, 'group')
  teachers!: GroupTeacherEntity[];
}
