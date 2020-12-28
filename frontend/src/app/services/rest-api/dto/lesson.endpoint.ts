export interface LessonResponse {
  id: string;
  timestamp: number;
  groupId: string;
}

export interface CreateLessonPayload {
  groupId: string;
  timestamp: number;
}
