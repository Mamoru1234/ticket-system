import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FetchService } from '../../../services/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../../services/rest-api/rest-api.service';
import { BehaviorSubject } from 'rxjs';
import { GroupResponse } from '../../../services/rest-api/dto/group.endpoint';
import { FormBuilder, Validators } from '@angular/forms';
import { DATE_OF_WEEK_OPTIONS, DATE_VALUES, DateUtils } from '../../../utils/date-utils';
import { AppRouter } from '../../../services/app-router';

export enum LessonScheduleState {
  SETUP = 'SETUP',
  VERIFY = 'VERIFY',
}

@Component({
  selector: 'app-lesson-schedule-page',
  templateUrl: './lesson-schedule-page.component.html',
  styleUrls: ['./lesson-schedule-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class LessonSchedulePageComponent implements OnInit {
  constructor(
    private readonly fetchService: FetchService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly restApi: RestApiService,
    private readonly formBuilder: FormBuilder,
    private readonly appRouter: AppRouter,
  ) { }
  pageDataWrapper = this.fetchService.createWrapper();
  lessonScheduleState = LessonScheduleState;
  currentState$ = new BehaviorSubject<LessonScheduleState>(LessonScheduleState.SETUP);
  createScheduleForm = this.formBuilder.group({
    lessonsCount: [null, [Validators.required, Validators.min(1)]],
    day: [new Date().getDay(), [Validators.required]],
    lessonTime: [DateUtils.getTimeInputValue(new Date()), [Validators.required]],
    dateFrom: [DateUtils.getDateInputValue(new Date()), [Validators.required]],
  });
  pageData$ = new BehaviorSubject<GroupResponse | null>(null);
  generatedDates$ = new BehaviorSubject<Date[]>([]);
  dateOfWeekOptions = DATE_OF_WEEK_OPTIONS;
  createLessonsWrapper = this.fetchService.createWrapper();

  ngOnInit(): void {
    this.pageDataWrapper.fetch(this.restApi.getGroupById(this.getGroupId()))
      .subscribe({
        next: (group) => {
          this.pageData$.next(group);
        },
      });
  }

  getGroupId(): string {
    return this.activatedRoute.snapshot.params.groupId;
  }

  setupSubmit(): void {
    if (!this.createScheduleForm.valid) {
      return;
    }
    const beginDate = this.createBeginDate();
    const matchingDate = this.findMatchingDate(beginDate);
    const dates: Date[] = [matchingDate];
    for (let i = 0; i < this.createScheduleForm.value.lessonsCount; i++) {
      dates.push(new Date(dates[i].getTime() + DATE_VALUES.WEEK));
    }
    this.generatedDates$.next(dates);
    this.goToState(LessonScheduleState.VERIFY);
  }

  goToState(state: LessonScheduleState): void {
    this.currentState$.next(state);
  }

  findMatchingDate(beginDate: Date): Date {
    let result = new Date(beginDate.getTime());
    const value = this.createScheduleForm.value;
    while (result.getDay() !== value.day) {
      const time = result.getTime() + DATE_VALUES.DAY;
      result = new Date(time);
    }
    return result;
  }

  createBeginDate(): Date {
    const value = this.createScheduleForm.value;
    const result = new Date(Date.parse(value.dateFrom));
    DateUtils.setTimeValue(result, value.lessonTime);
    return result;
  }

  removeFromGenerated(date: Date): void {
    this.generatedDates$.next(this.generatedDates$.getValue().filter((it) => it !== date));
  }

  createLessons(): void {
    const dates = this.generatedDates$.getValue();
    if (!dates.length) {
      return;
    }
    const timestamps = dates.map((it) => it.getTime());
    this.createLessonsWrapper.fetch(this.restApi.bulkCreateLessons({
      timestamps,
      groupId: this.getGroupId(),
    })).subscribe({
      next: () => {
        this.appRouter.navigate(`/groups/${this.getGroupId()}`);
      },
    });
  }
}
