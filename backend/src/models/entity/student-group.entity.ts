import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupMemberEntity } from './group-member.entity';
import { GroupTeacherEntity } from './group-teacher.entity';

@Entity('studentGroup')
export class StudentGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => GroupMemberEntity, 'group', {
    lazy: true
  })
  members!: Promise<GroupMemberEntity[]>;

  @OneToMany(() => GroupTeacherEntity, 'group', {
    lazy: true,
  })
  teachers!: Promise<GroupTeacherEntity[]>;
}
