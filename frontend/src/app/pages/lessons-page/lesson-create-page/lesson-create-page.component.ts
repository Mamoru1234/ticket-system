import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
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
  ) { }
  private readonly createLessonWrapper = this.fetchService.createWrapper();
  error$ = this.createLessonWrapper.error$.pipe(map(FetchService.httpErrorMapper));
  loading$ = this.createLessonWrapper.isInStatus(FetchStatus.IN_PROGRESS);
  createLessonForm = this.formBuilder.group({
    groupId: [null, Validators.required],
    timestamp: [null, Validators.required],
  });

  ngOnInit(): void {
    if (this.getGroupId()) {
      this.createLessonForm.get('groupId')?.setValue(this.getGroupId());
    }
  }

  getGroupId(): string {
    return this.activatedRoute.snapshot.queryParams.groupId;
  }

  submit(): void {
    if (!this.createLessonForm.valid) {
      return;
    }
    this.createLessonWrapper.fetch(this.restApi.createLesson({
      groupId: this.createLessonForm.value.groupId,
      timestamp: +this.createLessonForm.value.timestamp,
    })).subscribe({
      next: (lesson) => {
        console.log(lesson);
      }
    });
  }
}
