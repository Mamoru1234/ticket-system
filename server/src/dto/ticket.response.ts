import { Expose } from 'class-transformer/decorators';

export class TicketResponse {
  @Expose()
  id: string;

  @Expose()
  createdTimestamp: number;

  @Expose()
  validFromTimestamp: number;

  @Expose()
  validToTimestamp: number;

  @Expose()
  createdById: number;

  @Expose()
  studentId!: number;

  @Expose()
  visitsLeft!: number;


  @Expose()
  visitsTotal!: number;
}
