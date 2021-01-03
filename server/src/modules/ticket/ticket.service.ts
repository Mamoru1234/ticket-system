import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketEntity } from '../database/entity/ticket.entity';
import { UserEntity } from '../database/entity/user.entity';
import { CreateTicketPayload } from './dto/create-ticket.payload';
import { TicketDao } from '../database/dao/ticket.dao';
import { UserDao } from '../database/dao/user.dao';
import { Connection, MoreThan } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketDao: TicketDao,
    private readonly userDao: UserDao,
    private readonly connection: Connection,
  ) {
  }
  async createTicket(data: CreateTicketPayload, teacher: UserEntity): Promise<TicketEntity> {
    const student = await this.userDao.findOne(this.connection.manager, {
      where: {
        id: data.studentId,
      },
    });
    if (!student) {
      throw new BadRequestException('Student not found');
    }
    return this.ticketDao.save(this.connection.manager, {
      createdBy: teacher,
      createdTimestamp: Date.now(),
      student,
      visitsLeft: data.visits,
      visitsTotal: data.visits,
      validFromTimestamp: data.validFromTimestamp,
      validToTimestamp: data.validToTimestamp,
    });
  }

  async getForUser(userId: number): Promise<TicketEntity[]> {
    const student = await this.userDao.findOne(this.connection.manager, {
      where: {
        id: userId,
      },
    });
    if (!student) {
      throw new BadRequestException('Student not found');
    }
    return this.ticketDao.find(this.connection.manager, {
      where: {
        student,
      },
      order: {
        createdTimestamp: 'DESC',
      },
    });
  }
  async getAvailableForUser(userId: number): Promise<TicketEntity[]> {
    const student = await this.userDao.findOne(this.connection.manager, {
      where: {
        id: userId,
      },
    });
    if (!student) {
      throw new BadRequestException('Student not found');
    }
    return this.ticketDao.find(this.connection.manager, {
      where: {
        student,
        visitsLeft: MoreThan(0),
      },
      order: {
        createdTimestamp: 'DESC',
      },
    });
  }
}
