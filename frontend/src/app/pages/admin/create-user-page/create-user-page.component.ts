import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { RestApiService } from '../../../services/rest-api/rest-api.service';
import { finalize, map } from 'rxjs/operators';
import { UserResponse, UserRole } from '../../../services/rest-api/dto/user.endpoint';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class CreateUserPageComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly fetchService: FetchService,
    private readonly restApiService: RestApiService,
  ) { }
  createUserWrapper = this.fetchService.createWrapper();
  createUserForm!: FormGroup;
  error$ = this.createUserWrapper.error$.pipe(map(FetchService.httpErrorMapper));
  loading$ = this.createUserWrapper.isInStatus(FetchStatus.IN_PROGRESS);
  createdUser$ = new BehaviorSubject<UserResponse | null>(null);
  roleItems = [
    {
      label: 'Student',
      value: UserRole.STUDENT,
    },
    {
      label: 'Teacher',
      value: UserRole.TEACHER,
    },
    {
      label: 'Admin',
      value: UserRole.ADMIN,
    },
  ];

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      role: [UserRole.STUDENT, Validators.required],
    });
  }

  submit(): void {
    if (!this.createUserForm.valid) {
      return;
    }
    this.createUserForm.disable();
    this.createdUser$.next(null);
    this.createUserWrapper.fetch(this.restApiService.createUser(this.createUserForm.value))
      .pipe(finalize(() => this.createUserForm.enable()))
      .subscribe({
        next: (user) => {
          this.createUserForm.reset();
          this.createUserForm.get('role')?.setValue(UserRole.STUDENT);
          this.createdUser$.next(user);
        },
      });
  }

}
