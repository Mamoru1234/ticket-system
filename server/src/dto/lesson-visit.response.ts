import { Expose } from 'class-transformer/decorators';

export class LessonVisitResponse {
  @Expose()
  id: string;

  @Expose()
  studentId: number;

  @Expose()
  lessonId: string;
}
