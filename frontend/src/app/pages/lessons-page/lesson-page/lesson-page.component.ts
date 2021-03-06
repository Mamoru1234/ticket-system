import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import {
  CreateLessonVisitPayload,
  LessonResponse,
  LessonVisitResponse,
} from 'src/app/services/rest-api/dto/lesson.endpoint';
import { RestApiService } from '../../../services/rest-api/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { GroupResponse } from '../../../services/rest-api/dto/group.endpoint';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserResponse } from '../../../services/rest-api/dto/user.endpoint';
import { FormBuilder, Validators } from '@angular/forms';
import { TicketResponse } from '../../../services/rest-api/dto/ticket.endpoint';
import { DatePipe } from '@angular/common';
import { TicketUtils } from '../../../utils/ticket-utils';

export interface PageData {
  lesson: LessonResponse;
  group: GroupResponse;
}

export interface SearchData {
  user: UserResponse;
  tickets: TicketResponse[];
}

const BORG = '__SYSTEM_BORG';

export interface TicketItem {
  label: string;
  value: string;
}

const BORG_ITEM: TicketItem = {
  label: 'Борг',
  value: BORG,
};

export interface StudentVisit {
  student: UserResponse;
  visit: LessonVisitResponse;
}

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService, DatePipe],
})
export class LessonPageComponent implements OnInit {

  constructor(
    private readonly fetchService: FetchService,
    private readonly restApiService: RestApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly datePipe: DatePipe,
  ) { }
  pageDataWrapper = this.fetchService.createWrapper();
  pageData$ = new BehaviorSubject<PageData | null>(null);
  addVisitWrapper = this.fetchService.createWrapper();
  fetchStatus = FetchStatus;
  studentsWrapper = this.fetchService.createWrapper();
  recommendationsWrapper = this.fetchService.createWrapper();
  recommendations$ = new BehaviorSubject<UserResponse[] | null>(null);
  students$ = new BehaviorSubject<StudentVisit[]>([]);
  searchByIdForm = this.formBuilder.group({
    studentId: [null, Validators.required],
  });
  searchWrapper = this.fetchService.createWrapper();
  searchData$ = new BehaviorSubject<SearchData | null>(null);
  ticketItems$ = new BehaviorSubject<TicketItem[]>([BORG_ITEM]);
  ticketControl = this.formBuilder.control(null, [Validators.required]);
  ngOnInit(): void {
    const pageData: Partial<PageData> = {};
    const dataFetch$ = combineLatest([
      this.restApiService.getLessonById(this.getLessonId()),
      this.restApiService.getLessonStudentRecommendations(this.getLessonId())])
      .pipe(switchMap(([lesson]) => {
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
    const userId = this.searchByIdForm.value.studentId;
    this.searchUser(userId);
  }

  private searchUser(userId: number): void {
    this.ticketControl.reset();
    const data$ = combineLatest([
      this.restApiService.getById(userId),
      this.restApiService.getAvailableUserTickets(userId),
    ]);
    this.searchWrapper.fetch(data$)
      .subscribe({
        next: ([user, tickets]) => {
          this.searchData$.next({user, tickets});
          const ticketItems: TicketItem[] = tickets.map((it) => ({
            label: `${it.visitsLeft}: ${this.datePipe.transform(it.validFromTimestamp)} - ${this.datePipe.transform(it.validToTimestamp)}`,
            value: it.id,
          }));
          this.ticketItems$.next([BORG_ITEM, ...ticketItems]);
          if (ticketItems.length === 0) {
            this.ticketControl.setValue(BORG_ITEM.value);
          }
          // tslint:disable-next-line:no-non-null-assertion
          const pageData = this.pageData$.getValue()!;
          const validTicket = tickets.find((it) => TicketUtils.isTicketValidForLesson(pageData.lesson.timestamp, it));
          if (validTicket) {
            this.ticketControl.setValue(ticketItems[0].value);
          }
          this.searchByIdForm.enable();
          this.searchByIdForm.reset();
        },
      });
  }

  addToStudent(student: UserResponse): void {
    if (!this.ticketControl.valid) {
      this.ticketControl.markAsTouched();
      return;
    }
    const data: CreateLessonVisitPayload = {
      userId: student.id,
    };
    const ticket = this.ticketControl.value;
    if (ticket !== BORG) {
      data.ticketId = ticket;
    }
    this.addVisitWrapper.fetch(this.restApiService.createLessonVisit(this.getLessonId(), data)).subscribe({
      next: () => {
        this.getStudents();
        this.searchData$.next(null);
      },
    });
  }

  getStudents(): void {
    const data$ = this.restApiService.getLessonVisits(this.getLessonId())
      .pipe(
        switchMap((visits) => {
          const userIds = visits.map((it) => it.studentId);
          if (userIds.length === 0) {
            return of([] as StudentVisit[]);
          }
          return this.restApiService.listUsers(userIds).pipe(map((users): StudentVisit[] => {
            return visits.map((it): StudentVisit => {
              const student = users.find((itUser) => itUser.id === it.studentId);
              if (!student) {
                throw new Error('Student not found');
              }
              return ({
                visit: it,
                student,
              });
            });
          }));
        })
      );
    this.studentsWrapper.fetch(data$)
      .subscribe({
        next: (visits) => {
          this.students$.next(visits);
        },
      });
  }

  openRecommendations(): void {
    this.recommendationsWrapper.fetch(this.restApiService.getLessonStudentRecommendations(this.getLessonId()))
      .subscribe({
        next: (recommendations) => {
          const students = this.students$.getValue();
          this.recommendations$.next(recommendations.filter(it => !students.some((visit) => visit.student.id === it.id)));
        },
      });
  }

  addRecommendationClick(studentId: number): void {
    this.searchUser(studentId);
  }

  get ticketSelected(): boolean {
    const value = this.ticketControl.value;
    return value != null && value !== BORG;
  }
}
