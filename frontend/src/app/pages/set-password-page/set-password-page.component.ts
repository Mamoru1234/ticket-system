import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FetchService, FetchStatus } from '../../services/fetch.service';
import { RestApiService } from '../../services/rest-api/rest-api.service';
import { map } from 'rxjs/operators';

const passwordMatch = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordMismatch: true }
    : null;
};

@Component({
  selector: 'app-set-password-page',
  templateUrl: './set-password-page.component.html',
  styleUrls: ['./set-password-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class SetPasswordPageComponent implements OnInit {

  constructor(
    private readonly tokenService: TokenService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly fetchService: FetchService,
    private readonly restApiService: RestApiService,
  ) { }

  setPasswordWrapper = this.fetchService.createWrapper();
  loading$ = this.setPasswordWrapper.isInStatus(FetchStatus.IN_PROGRESS);
  error$ = this.setPasswordWrapper.error$.pipe(map(FetchService.httpErrorMapper));
  setPasswordForm = this.formBuilder.group({
    password: [null, Validators.required],
    confirmPassword: [null, Validators.required],
  }, {
    validators: passwordMatch,
  });

  ngOnInit(): void {
    this.tokenService.clearToken();
    if (!this.getToken()) {
      console.error('No set password token');
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/login']);
    }
  }

  getToken(): string {
    return this.activatedRoute.snapshot.queryParams.token;
  }

  setPassword(): void {
    if (!this.setPasswordForm.valid) {
      return;
    }

    this.setPasswordWrapper.fetch(this.restApiService.setPassword({
      token: this.getToken(),
      password: this.setPasswordForm.value.password,
    })).subscribe({
      next: () => {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/login']);
      },
    });
  }
}
