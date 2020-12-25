import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { RestApiService } from '../../services/rest-api/rest-api.service';
import { BehaviorSubject } from 'rxjs';
import { UserResponse } from '../../services/rest-api/dto/user.endpoint';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  providers: [FetchService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements OnInit {
  constructor(
    private readonly fetchService: FetchService,
    private readonly restApiService: RestApiService,
  ) { }
  usersWrapper = this.fetchService.createWrapper();
  users$ = new BehaviorSubject<UserResponse[]>([]);

  ngOnInit(): void {
    this.usersWrapper.fetch(this.restApiService.getAllUsers())
      .subscribe({
        next: (data) => {
          this.users$.next(data);
        },
      });
  }
}
