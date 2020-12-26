import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupMemberEntity } from './group-member.entity';
import { UserRole } from '../../../constants/user-role.enum';
import { GroupTeacherEntity } from './group-teacher.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    enum: UserRole,
  })
  role!: UserRole;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => GroupMemberEntity, 'student', {
    lazy: true,
  })
  participate!: Promise<GroupMemberEntity[]>;

  @OneToMany(() => GroupTeacherEntity, 'teacher', {
    lazy: true,
  })
  teacher!: Promise<GroupTeacherEntity[]>;
}
