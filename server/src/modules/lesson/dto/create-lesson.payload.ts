import { IsDefined, IsPositive, IsUUID } from 'class-validator';

export class CreateLessonPayload {
  @IsDefined()
  @IsPositive()
  timestamp: number;

  @IsDefined()
  @IsUUID()
  groupId: string;
}
