import { AbstractDao } from './abstract.dao';
import { TicketEntity } from '../entity/ticket.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketDao extends AbstractDao<TicketEntity> {
  target = TicketEntity;
}
