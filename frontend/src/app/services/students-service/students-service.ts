import { Injectable } from '@angular/core';

export enum VisitType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL'
}

let lastStudentId = 0;

function studentId() {
  return lastStudentId++;
}

function generateStudent(name: string, visitType: VisitType = VisitType.INTERNAL): Student {
  return {
    id: studentId(),
    name,
    visit: visitType,
  };
}

export interface Student {
  name: string;
  id: number;
  visit: VisitType;
}

@Injectable()
export class StudentsService {
  getAllStudents(): Student[] {
    return [
      generateStudent('John Doe'),
      generateStudent('Alexei Gontar'),
      generateStudent('Anna'),
      generateStudent('Micha'),
    ];
  }
  createNewStudent(name: string, visitType: VisitType): Student {
    return generateStudent(name, visitType);
  }
}
