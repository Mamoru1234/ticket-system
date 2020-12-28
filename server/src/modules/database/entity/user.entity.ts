import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupMemberEntity } from './group-member.entity';
import { UserRole } from '../../../constants/user-role.enum';
import { GroupTeacherEntity } from './group-teacher.entity';
import { NUMERIC_TRANSFORMER_INSTANCE } from '../transformer/numeric.transformer';

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

  @Column('bigint', {
    transformer: NUMERIC_TRANSFORMER_INSTANCE,
    default: 0,
  })
  lastForgotPassRequest: number;

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
