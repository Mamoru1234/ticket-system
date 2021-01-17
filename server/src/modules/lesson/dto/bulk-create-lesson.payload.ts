import { IsDefined, IsPositive, IsUUID } from 'class-validator';

export class BulkCreateLessonPayload {
  @IsDefined()
  @IsDefined({
    each: true,
  })
  @IsPositive({
    each: true,
  })
  timestamps: number[];

  @IsDefined()
  @IsUUID()
  groupId: string;
}
