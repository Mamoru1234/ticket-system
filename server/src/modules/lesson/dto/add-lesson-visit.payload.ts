import { IsDefined, IsNumber } from 'class-validator';

export class AddLessonVisitPayload {
  @IsDefined()
  @IsNumber()
  userId: number;
}
