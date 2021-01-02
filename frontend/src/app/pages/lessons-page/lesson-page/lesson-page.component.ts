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
  loading$ = this.pageDataWrapper.isInStatuses(FetchStatus.INIT, FetchStatus.IN_PROGRESS);
  pageData$ = new BehaviorSubject<PageData | null>(null);
  students$ = new BehaviorSubject<UserResponse[]>([]);
  searchByIdForm = this.formBuilder.group({
    studentId: [null, Validators.required],
  });
  searchWrapper = this.fetchService.createWrapper();
  searchUser$ = new BehaviorSubject<UserResponse | null>(null);
  searchLoading$ = this.searchWrapper.isInStatus(FetchStatus.IN_PROGRESS);
  ngOnInit(): void {
    const pageData: Partial<PageData> = {};
    const dataFetch$ = this.restApiService.getLessonById(this.getLessonId())
      .pipe(switchMap((lesson) => {
        pageData.lesson = lesson;
        return this.restApiService.getGroupById(lesson.groupId);
      }));
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
    this.searchWrapper.fetch(this.restApiService.getById(this.searchByIdForm.value.studentId))
      .subscribe({
        next: (user) => {
          this.searchUser$.next(user);
        }
      });
  }

  addToStudents(student: UserResponse): void {
    const students = this.students$.getValue();
    const isInStudents = students.some((it) => it.id === student.id);
    if (isInStudents) {
      return;
    }
    this.students$.next(this.students$.getValue().concat([student]));
    this.searchUser$.next(null);
  }
}
