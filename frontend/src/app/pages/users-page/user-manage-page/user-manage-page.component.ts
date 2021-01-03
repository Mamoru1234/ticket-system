import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from '../../../services/rest-api/dto/user.endpoint';
import { TicketResponse } from '../../../services/rest-api/dto/ticket.endpoint';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { RestApiService } from '../../../services/rest-api/rest-api.service';

export interface PageData {
  user: UserResponse;
  tickets: TicketResponse[];
}

@Component({
  selector: 'app-user-manage-page',
  templateUrl: './user-manage-page.component.html',
  styleUrls: ['./user-manage-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class UserManagePageComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fetchService: FetchService,
    private readonly restApi: RestApiService,
  ) { }

  pageDataWrapper = this.fetchService.createWrapper();
  fetchStatus = FetchStatus;
  pageData$ = new BehaviorSubject<PageData | null>(null);

  ngOnInit(): void {
    const data$ = combineLatest([this.restApi.getById(this.getUserId()), this.restApi.getAllUserTickets(this.getUserId())]);
    this.pageDataWrapper.fetch(data$)
      .subscribe({
        next: ([user, tickets]) => {
          this.pageData$.next({
            user,
            tickets,
          });
        },
      });
  }

  getUserId(): number {
    return +this.activatedRoute.snapshot.params.userId;
  }
}
