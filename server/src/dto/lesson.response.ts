import { Expose } from 'class-transformer/decorators';

export class LessonResponse {
  @Expose()
  id: string;
  @Expose()
  timestamp: number;
  @Expose()
  groupId: string;
}
