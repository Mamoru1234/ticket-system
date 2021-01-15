import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { BehaviorSubject } from 'rxjs';
import { UserResponse } from '../../../services/rest-api/dto/user.endpoint';
import { RestApiService } from '../../../services/rest-api/rest-api.service';
import { FormBuilder, Validators } from '@angular/forms';

const DAY = 1000 * 60 * 60 * 24;
const WEEK = 7 * DAY;
const MONTH = 4 * WEEK;

export enum DateRange {
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

function getDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

@Component({
  selector: 'app-create-ticket-page',
  templateUrl: './create-ticket-page.component.html',
  styleUrls: ['./create-ticket-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class CreateTicketPageComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fetchService: FetchService,
    private readonly restApi: RestApiService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) { }
  fetchStatus = FetchStatus;
  pageDataWrapper = this.fetchService.createWrapper();
  pageData$ = new BehaviorSubject<UserResponse | null>(null);
  createTicketForm = this.formBuilder.group({
    visits: [null, [Validators.required]],
    validFrom: [getDateInputValue(new Date()), [Validators.required]],
    validTo: [null, [Validators.required]],
  });
  dateRange = DateRange;
  createTicketWrapper = this.fetchService.createWrapper();

  ngOnInit(): void {
    this.pageDataWrapper.fetch(this.restApi.getById(this.getUserId()))
      .subscribe({
        next: (user) => this.pageData$.next(user),
      });
  }

  getUserId(): number {
    return +this.activatedRoute.snapshot.params.userId;
  }

  submit(): void {
    console.log(this.createTicketForm.value);
    if (!this.createTicketForm.valid) {
      return;
    }
    const formValue = this.createTicketForm.value;
    this.createTicketWrapper.fetch(this.restApi.createTicket({
      studentId: this.getUserId(),
      visits: formValue.visits,
      validFromTimestamp: Date.parse(formValue.validFrom),
      validToTimestamp: Date.parse(formValue.validTo),
    })).subscribe({
      next: () => {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate([`/users/manage/${this.getUserId()}`]);
      },
    });
  }

  rangeClick(value: DateRange): void {
    const validFrom = Date.parse(this.createTicketForm.value.validFrom);
    const date = new Date(this.getRangeChange(validFrom, value));
    this.createTicketForm.get('validTo')?.setValue(getDateInputValue(date));
  }

  getRangeChange(value: number, range: DateRange): number {
    if (range === DateRange.WEEK) {
      return value + WEEK;
    }
    if (range === DateRange.MONTH) {
      return value + MONTH;
    }
    return value;
  }
}
