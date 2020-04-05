import { Component, OnInit } from '@angular/core';
import { Student, StudentsService, VisitType } from '../../services/students-service/students-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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

  students$: Observable<Student[]>;
  lessonDate = new FormControl(new Date());
  newStudent = new FormGroup({
    name: new FormControl('', Validators.required),
    visitType: new FormControl(VisitType.INTERNAL),
  });
  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.students$ = this.studentsService.getAllStudents();
  }

  showStudents() {
    this.studentsService.showStudents();
  }

  removeStudent(id: number) {
    this.studentsService.removeStudent(id);
  }

  addStudent() {
    const values: NewStudentFormState = this.newStudent.value;
    this.studentsService.createNewStudent(values.name, values.visitType);
    this.newStudent.reset({
      name: '',
      visitType: VisitType.INTERNAL,
    });
  }
}
