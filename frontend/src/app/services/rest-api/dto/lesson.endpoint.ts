export interface LessonResponse {
  id: string;
  timestamp: number;
  groupId: string;
}

export interface CreateLessonPayload {
  groupId: string;
  timestamp: number;
}

export interface BulkCreateLessonPayload {
  groupId: string;
  timestamps: number[];
}

export interface CreateLessonVisitPayload {
  userId: number;
  ticketId?: string;
}

export interface LessonVisitResponse {
  id: string;
  studentId: number;
  lessonId: string;
  ticketId?: string;
}
