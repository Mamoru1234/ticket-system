import { AbstractDao } from './abstract.dao';
import { GroupMemberEntity } from '../entity/group-member.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupMemberDao extends AbstractDao<GroupMemberEntity> {
  target = GroupMemberEntity;
}
