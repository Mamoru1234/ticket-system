import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { RestApiService } from '../../../services/rest-api/rest-api.service';
import { GroupResponse } from '../../../services/rest-api/dto/group.endpoint';
import { LessonResponse } from 'src/app/services/rest-api/dto/lesson.endpoint';
import { BehaviorSubject } from 'rxjs';

export interface GroupPageData {
  group: GroupResponse;
  lessons: LessonResponse[];
}

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class GroupPageComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fetchService: FetchService,
    private readonly restApiService: RestApiService,
  ) { }
  pageData$ = new BehaviorSubject<GroupPageData | null>(null);
  private readonly fetchDataWrapper = this.fetchService.createWrapper();
  loading$ = this.fetchDataWrapper.isInStatuses(FetchStatus.IN_PROGRESS, FetchStatus.INIT);

  ngOnInit(): void {
    this.fetchDataWrapper.fetch(this.restApiService.getGroupById(this.getGroupId()))
      .subscribe({
        next: (group) => {
          console.log(group);
          this.pageData$.next({
            group,
            lessons: [],
          });
        },
      });
  }

  getGroupId(): string {
    return this.activatedRoute.snapshot.params.groupId;
  }
}
