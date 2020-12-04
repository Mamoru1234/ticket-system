import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupMemberEntity } from './group-member.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  role!: string;

  @Column()
  password!: string;

  @OneToMany(() => GroupMemberEntity, 'student')
  participate!: GroupMemberEntity[];
}
