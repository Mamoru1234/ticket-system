export interface TicketResponse {
  id: string;

  createdTimestamp: number;

  validFromTimestamp: number;

  validToTimestamp: number;

  createdById: number;

  studentId: number;

  visitsLeft: number;
}

export interface CreateTicketPayload {
  validFromTimestamp: number;

  validToTimestamp: number;

  studentId: number;

  visits: number;
}
