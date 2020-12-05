import { AbstractDao } from './abstract.dao';
import { GroupMemberEntity } from '../entity/group-member.entity';
import { Service } from 'typedi';

@Service()
export class GroupMemberDao extends AbstractDao<GroupMemberEntity> {
  target = GroupMemberEntity;
}
