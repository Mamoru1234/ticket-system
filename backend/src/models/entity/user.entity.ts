import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupMemberEntity } from './group-member.entity';
import { UserRole } from '../../constants/user-role.enum';

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
  login!: string;

  @Column()
  password!: string;

  @OneToMany(() => GroupMemberEntity, 'student')
  participate!: GroupMemberEntity[];

  @OneToMany(() => GroupMemberEntity, 'student')
  teacher!: GroupMemberEntity[];
}
