export interface LessonResponse {
  id: string;
  timestamp: number;
  groupId: string;
}

export interface CreateLessonPayload {
  groupId: string;
  timestamp: number;
}

export interface CreateLessonVisitPayload {
  userId: number;
}

export interface LessonVisitResponse {
  id: string;
  studentId: number;
  lessonId: string;
}
