import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../../services/rest-api/rest-api.service';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { UserResponse } from '../../../services/rest-api/dto/user.endpoint';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-activate-user-page',
  templateUrl: './activate-user-page.component.html',
  styleUrls: ['./activate-user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class ActivateUserPageComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fetchService: FetchService,
    private readonly restApiService: RestApiService,
    private readonly formBuilder: FormBuilder,
  ) {
  }
  activateUserForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });
  private readonly getUserWrapper = this.fetchService.createWrapper();
  private readonly activateUserWrapper = this.fetchService.createWrapper();
  error$ = merge(
    this.getUserWrapper.error$.pipe(map(FetchService.httpErrorMapper)),
    this.activateUserWrapper.error$.pipe(map(FetchService.httpErrorMapper)));
  loading$: Observable<boolean> = merge(
    this.getUserWrapper.isInStatus(FetchStatus.IN_PROGRESS),
    this.activateUserWrapper.isInStatus(FetchStatus.IN_PROGRESS));
  targetUser$ = new BehaviorSubject<UserResponse | null>(null);
  formError$ = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.getUserWrapper.fetch(this.restApiService.getById(this.getUserId()))
      .subscribe({
        next: user => {
          if (user.email) {
            this.activateUserForm.disable();
          }
          this.targetUser$.next(user);
        },
      });
  }

  getUserId(): number {
    const { userId } = this.activatedRoute.snapshot.params;
    if (!userId) {
      console.log('No user param');
      return -1;
    }
    return +userId;
  }

  activate(): void {
    if (!this.activateUserForm.valid) {
      return;
    }
    this.activateUserForm.disable();
    this.activateUserWrapper.fetch(this.restApiService.activateUser({
      email: this.activateUserForm.value.email,
      id: this.getUserId(),
    })).subscribe({
      next: user => this.targetUser$.next(user),
    });
  }
}
