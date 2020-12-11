import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../../services/rest-api/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly restApiService: RestApiService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly tokenService: TokenService,
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
    this.restApiService.login(this.form.value).subscribe({
      next: (response) => {
        this.tokenService.setToken(response.token);
        const redirect = this.route.snapshot.queryParams.redirect;
        if (redirect) {
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate([redirect]);
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
