import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../../services/rest-api/rest-api.service';
import { TokenService } from '../../services/token.service';
import { BehaviorSubject } from 'rxjs';
import { FetchService, FetchStatus } from '../../services/fetch.service';
import { AppRouter } from '../../services/app-router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  showComponent$ = new BehaviorSubject(true);
  loginFetchWrapper = this.fetchService.createWrapper();
  isLoading$ = this.loginFetchWrapper.isInStatus(FetchStatus.IN_PROGRESS);
  error$ = this.loginFetchWrapper.error$;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly restApiService: RestApiService,
    private readonly tokenService: TokenService,
    private readonly fetchService: FetchService,
    private readonly appRouter: AppRouter,
  ) { }

  ngOnInit(): void {
    this.tokenService.clearToken();
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  login(): void {
    if (!this.form.valid) {
      return;
    }
    this.loginFetchWrapper.fetch(this.restApiService.login(this.form.value)).subscribe({
      next: (response) => {
        this.tokenService.setToken(response.token);
        this.appRouter.restoreNavigation('/');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  toggle(): void {
    this.showComponent$.next(!this.showComponent$.getValue());
  }
}
