import { IsDefined, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class AddLessonVisitPayload {
  @IsDefined()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsUUID()
  ticketId: string;
}
