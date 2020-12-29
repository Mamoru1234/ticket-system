import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RestApiService } from '../../../services/rest-api/rest-api.service';
import { finalize, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { GroupResponse } from '../../../services/rest-api/dto/group.endpoint';

@Component({
  selector: 'app-create-group-page',
  templateUrl: './create-group-page.component.html',
  styleUrls: ['./create-group-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class CreateGroupPageComponent implements OnInit {

  constructor(
    private readonly fetchService: FetchService,
    private readonly formBuilder: FormBuilder,
    private readonly restApiService: RestApiService,
  ) { }
  createGroupForm = this.formBuilder.group({
    name: [null, Validators.required],
  });
  createdGroup$ = new BehaviorSubject<GroupResponse | null>(null);
  createGroupWrapper = this.fetchService.createWrapper();
  loading$ = this.createGroupWrapper.isInStatuses(FetchStatus.IN_PROGRESS);
  error$ = this.createGroupWrapper.error$;

  ngOnInit(): void {
  }

  submit(): void {
    if (!this.createGroupForm.valid) {
      return;
    }
    this.createGroupForm.disable();
    this.createdGroup$.next(null);
    this.createGroupWrapper.fetch(this.restApiService.createGroup(this.createGroupForm.value))
      .pipe(finalize(() => this.createGroupForm.enable()))
      .subscribe({
        next: group => {
          this.createdGroup$.next(group);
          this.createGroupForm.reset();
        },
      });
  }
}
