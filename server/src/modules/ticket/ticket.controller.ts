import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { TicketResponse } from '../../dto/ticket.response';
import { Role } from '../../decorators/role.decorator';
import { UserRole } from '../../constants/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../../guards/role.guard';
import { UserEntity } from '../database/entity/user.entity';
import { User } from '../../decorators/user.decorator';
import { CreateTicketPayload } from './dto/create-ticket.payload';
import { TicketService } from './ticket.service';
import { plainToClass } from 'class-transformer';
import { DEFAULT_TRANSFORM_OPTIONS } from '../../constants/class-transform.options';

@Controller('tickets')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
  ) {
  }

  @Put('create')
  @Role(UserRole.TEACHER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async createTicket(
    @User() user: UserEntity,
    @Body() data: CreateTicketPayload,
  ): Promise<TicketResponse> {
    const ticket = await this.ticketService.createTicket(data, user);
    return plainToClass(TicketResponse, ticket, DEFAULT_TRANSFORM_OPTIONS);
  }

  @Get('by-user/:userId')
  @Role(UserRole.TEACHER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async getForUser(
    @Param('userId') userId: number,
  ): Promise<TicketResponse[]> {
    const tickets = await this.ticketService.getForUser(userId);
    return plainToClass(TicketResponse, tickets, DEFAULT_TRANSFORM_OPTIONS);
  }

  @Get('available/:userId')
  @Role(UserRole.TEACHER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async getAvailableTickets(
    @Param('userId') userId: number,
  ): Promise<TicketResponse[]> {
    const tickets = await this.ticketService.getAvailableForUser(userId);
    return plainToClass(TicketResponse, tickets, DEFAULT_TRANSFORM_OPTIONS);
  }
}
