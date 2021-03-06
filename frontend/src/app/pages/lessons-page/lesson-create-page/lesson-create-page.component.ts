import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../../services/rest-api/rest-api.service';

@Component({
  selector: 'app-lesson-create-page',
  templateUrl: './lesson-create-page.component.html',
  styleUrls: ['./lesson-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class LessonCreatePageComponent implements OnInit {

  constructor(
    private readonly fetchService: FetchService,
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly restApi: RestApiService,
    private readonly router: Router,
  ) { }
  private readonly createLessonWrapper = this.fetchService.createWrapper();
  error$ = this.createLessonWrapper.error$;
  loading$ = this.createLessonWrapper.isInStatus(FetchStatus.IN_PROGRESS);
  createLessonForm = this.formBuilder.group({
    timestamp: [null, Validators.required],
  });

  ngOnInit(): void {
  }

  getGroupId(): string {
    return this.activatedRoute.snapshot.params.groupId;
  }

  submit(): void {
    if (!this.createLessonForm.valid) {
      return;
    }
    this.createLessonWrapper.fetch(this.restApi.createLesson({
      groupId: this.getGroupId(),
      timestamp: Date.parse(this.createLessonForm.value.timestamp),
    })).subscribe({
      next: (lesson) => {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate([`/groups/${lesson.groupId}`]);
      },
    });
  }
}
