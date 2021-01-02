import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { LessonResponse } from 'src/app/services/rest-api/dto/lesson.endpoint';
import { RestApiService } from '../../../services/rest-api/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { GroupResponse } from '../../../services/rest-api/dto/group.endpoint';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserResponse } from '../../../services/rest-api/dto/user.endpoint';
import { FormBuilder, Validators } from '@angular/forms';

export interface PageData {
  lesson: LessonResponse;
  group: GroupResponse;
}

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class LessonPageComponent implements OnInit {

  constructor(
    private readonly fetchService: FetchService,
    private readonly restApiService: RestApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
  ) { }
  pageDataWrapper = this.fetchService.createWrapper();
  pageData$ = new BehaviorSubject<PageData | null>(null);
  addVisitWrapper = this.fetchService.createWrapper();
  fetchStatus = FetchStatus;
  studentsWrapper = this.fetchService.createWrapper();
  students$ = new BehaviorSubject<UserResponse[]>([]);
  searchByIdForm = this.formBuilder.group({
    studentId: [null, Validators.required],
  });
  searchWrapper = this.fetchService.createWrapper();
  searchUser$ = new BehaviorSubject<UserResponse | null>(null);
  ngOnInit(): void {
    const pageData: Partial<PageData> = {};
    const dataFetch$ = this.restApiService.getLessonById(this.getLessonId())
      .pipe(switchMap((lesson) => {
        pageData.lesson = lesson;
        return this.restApiService.getGroupById(lesson.groupId);
      }));
    this.getStudents();
    this.pageDataWrapper.fetch(dataFetch$)
      .subscribe({
        next: (group) => {
          pageData.group = group;
          this.pageData$.next(pageData as PageData);
        },
      });
  }

  getLessonId(): string {
    return this.activatedRoute.snapshot.params.lessonId;
  }

  searchSubmit(): void {
    if (!this.searchByIdForm.valid) {
      return;
    }
    this.searchByIdForm.disable();
    this.searchWrapper.fetch(this.restApiService.getById(this.searchByIdForm.value.studentId))
      .subscribe({
        next: (user) => {
          this.searchUser$.next(user);
          this.searchByIdForm.enable();
          this.searchByIdForm.reset();
        }
      });
  }

  addToStudent(student: UserResponse): void {
    this.addVisitWrapper.fetch(this.restApiService.createLessonVisit(this.getLessonId(), {
      userId: student.id,
    })).subscribe({
      next: () => {
        this.getStudents();
        this.searchUser$.next(null);
      },
    });
  }

  getStudents(): void {
    const data$ = this.restApiService.getLessonVisits(this.getLessonId())
      .pipe(
        switchMap((visits) => {
          const userIds = visits.map((it) => it.studentId);
          return this.restApiService.listUsers(userIds);
        })
      );
    this.studentsWrapper.fetch(data$)
      .subscribe({
        next: (visits) => {
          this.students$.next(visits);
        },
      });
  }
}
