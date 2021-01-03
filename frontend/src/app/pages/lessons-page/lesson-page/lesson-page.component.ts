import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { CreateLessonVisitPayload, LessonResponse } from 'src/app/services/rest-api/dto/lesson.endpoint';
import { RestApiService } from '../../../services/rest-api/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { GroupResponse } from '../../../services/rest-api/dto/group.endpoint';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserResponse } from '../../../services/rest-api/dto/user.endpoint';
import { FormBuilder, Validators } from '@angular/forms';
import { TicketResponse } from '../../../services/rest-api/dto/ticket.endpoint';
import { DatePipe } from '@angular/common';

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
  students$ = new BehaviorSubject<UserResponse[]>([]);
  searchByIdForm = this.formBuilder.group({
    studentId: [null, Validators.required],
  });
  searchWrapper = this.fetchService.createWrapper();
  searchData$ = new BehaviorSubject<SearchData | null>(null);
  ticketItems$ = new BehaviorSubject<TicketItem[]>([BORG_ITEM]);
  ticketControl = this.formBuilder.control(null, [Validators.required]);
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
    const userId = this.searchByIdForm.value.studentId;
    const data$ = combineLatest([
      this.restApiService.getById(userId),
      this.restApiService.getAvailableUserTickets(userId)
    ]);
    this.searchWrapper.fetch(data$)
      .subscribe({
        next: ([user, tickets]) => {
          this.searchData$.next({ user, tickets });
          const ticketItems: TicketItem[] = tickets.map((it) => ({
            label: `${it.visitsLeft}: ${this.datePipe.transform(it.validFromTimestamp)} - ${this.datePipe.transform(it.validToTimestamp)}`,
            value: it.id,
          }));
          this.ticketItems$.next([BORG_ITEM, ...ticketItems]);
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
            return of([]);
          }
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

  private formatDate(timestamp: number): string {
    return new Date().toLocaleDateString();
  }
}
