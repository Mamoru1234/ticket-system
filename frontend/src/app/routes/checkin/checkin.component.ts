import { Component, OnInit } from '@angular/core';

enum VisitType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL'
}

interface Student {
  name: string;
  id: number;
  visit: VisitType;
}

let lastStudentId = 0;

function studentId() {
  return lastStudentId++;
}

function generateStudent(name: string): Student {
  return {
    id: studentId(),
    name,
    visit: null,
  };
}

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  VisitType = VisitType;

  students: Student[] = [
    generateStudent('John Doe'),
    generateStudent('Alexei Gontar'),
    generateStudent('Anna'),
    generateStudent('Micha'),
  ];
  newStudentName: string;
  constructor() { }

  ngOnInit() {
  }

  showStudents() {
    console.log(this.students);
  }

  removeStudent(id: number) {
    this.students = this.students.filter((it) => it.id !== id);
  }

  addStudent() {
    if (this.students.some((student) => student.name === this.newStudentName)) {
      return;
    }
    const newStudent: Student = generateStudent(this.newStudentName);
    this.students = this.students.concat([newStudent]);
    this.newStudentName = '';
  }
}
