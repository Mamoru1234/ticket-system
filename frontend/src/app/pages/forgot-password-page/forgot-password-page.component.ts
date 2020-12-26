import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FetchService, FetchStatus } from '../../services/fetch.service';
import { RestApiService } from '../../services/rest-api/rest-api.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class ForgotPasswordPageComponent implements OnInit {

  constructor(
    private readonly fetchService: FetchService,
    private readonly formBuilder: FormBuilder,
    private readonly restApiService: RestApiService,
  ) { }

  forgotPasswordForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });
  forgotWrapper = this.fetchService.createWrapper();
  loading$ = this.forgotWrapper.isInStatus(FetchStatus.IN_PROGRESS);
  error$ = this.forgotWrapper.error$.pipe(map(FetchService.httpErrorMapper));
  successSend$ = new BehaviorSubject(false);

  ngOnInit(): void {
  }

  submit(): void {
    if (!this.forgotPasswordForm.valid) {
      return;
    }
    this.forgotPasswordForm.disable();
    this.forgotWrapper.fetch(this.restApiService.forgotPassword(this.forgotPasswordForm.value))
      .pipe(catchError((e) => {
        this.forgotPasswordForm.enable();
        return throwError(e);
      }))
      .subscribe({
        next: () => {
          this.successSend$.next(true);
        },
      });
  }
}
