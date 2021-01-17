import { TicketResponse } from '../services/rest-api/dto/ticket.endpoint';

export class TicketUtils {
  static isTicketValidForLesson(lessonTime: number, ticket: TicketResponse): boolean {
    if (ticket.validFromTimestamp > lessonTime) {
      return false;
    }
    return ticket.validToTimestamp >= lessonTime;
  }
}
