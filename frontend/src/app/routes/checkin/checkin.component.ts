import { Component, OnInit } from '@angular/core';
import { Student, StudentsService, VisitType } from '../../services/students-service/students-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface NewStudentFormState {
  name: string;
  visitType: VisitType;
}

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss'],
})
export class CheckinComponent implements OnInit {
  VisitType = VisitType;
  visitOptions = Object.values(VisitType);

  students: Student[] = [];
  newStudentType: VisitType = VisitType.INTERNAL;
  newStudent = new FormGroup({
    name: new FormControl('', Validators.required),
    visitType: new FormControl(VisitType.INTERNAL),
  });
  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.students = this.studentsService.getAllStudents();
  }

  showStudents() {
    console.log(this.students);
  }

  removeStudent(id: number) {
    this.students = this.students.filter((it) => it.id !== id);
  }

  addStudent() {
    if (this.students.some((student) => student.name === this.newStudent.value.name)) {
      return;
    }
    const values: NewStudentFormState = this.newStudent.value;
    const newStudent: Student = this.studentsService.createNewStudent(values.name, values.visitType);
    this.students = this.students.concat([newStudent]);
    this.newStudent.reset({
      name: '',
      visitType: VisitType.INTERNAL,
    });
  }
}
