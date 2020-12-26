import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { RestApiService } from '../../../services/rest-api/rest-api.service';
import { BehaviorSubject } from 'rxjs';
import { GroupResponse } from '../../../services/rest-api/dto/group.endpoint';

@Component({
  selector: 'app-teacher-groups-page',
  templateUrl: './teacher-groups-page.component.html',
  styleUrls: ['./teacher-groups-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class TeacherGroupsPageComponent implements OnInit {

  constructor(
    private readonly fetchService: FetchService,
    private readonly restApiService: RestApiService,
  ) { }

  getGroupsWrapper = this.fetchService.createWrapper();
  loading$ = this.getGroupsWrapper.isInStatuses(FetchStatus.IN_PROGRESS, FetchStatus.INIT);
  groups$ = new BehaviorSubject<GroupResponse[]>([]);

  ngOnInit(): void {
    this.getGroupsWrapper.fetch(this.restApiService.getTeacherGroups())
      .subscribe({
        next: (data) => this.groups$.next(data),
      });
  }
}
