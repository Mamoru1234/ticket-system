import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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
  private students$ = new BehaviorSubject<Student[]>([]);
  getAllStudents(): Observable<Student[]> {
    this.students$.next([
      generateStudent('John Doe'),
      generateStudent('Alexei Gontar'),
      generateStudent('Anna'),
      generateStudent('Micha'),
    ]);
    return this.students$;
  }
  createNewStudent(name: string, visitType: VisitType): void {
    const newState = this.students$.value.concat([generateStudent(name, visitType)]);
    this.students$.next(newState);
    // return generateStudent(name, visitType);
  }
  removeStudent(id: number): void {
    const newState = this.students$.value.filter((it) => it.id !== id);
    this.students$.next(newState);
  }
  showStudents() {
    console.log(this.students$.value);
  }
}
