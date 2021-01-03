import { IsDefined, IsPositive } from 'class-validator';

export class CreateTicketPayload {
  @IsDefined()
  @IsPositive()
  validFromTimestamp: number;

  @IsDefined()
  @IsPositive()
  validToTimestamp: number;

  @IsDefined()
  @IsPositive()
  studentId!: number;

  @IsDefined()
  @IsPositive()
  visits!: number;
}
