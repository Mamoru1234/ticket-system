import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { UserStore } from '../../stores/user.store';
import { UserResponse, UserRole } from '../../services/rest-api/dto/user.endpoint';
import { FetchService } from '../../services/fetch.service';
import { takeUntil } from 'rxjs/operators';

export interface HeaderItem {
  label: string;
  url: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FetchService],
})
export class AppHeaderComponent implements OnInit {
  @Select(UserStore.currentUser) currentUser!: Observable<UserResponse>;
  items$ = new BehaviorSubject<HeaderItem[]>([]);
  stubWrapper = this.fetchService.createWrapper();
  constructor(
    private readonly fetchService: FetchService,
    private readonly tokenService: TokenService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.currentUser.pipe(
      takeUntil(this.stubWrapper.destroy$)
    ).subscribe({
      next: user => {
        if (!user) {
          this.items$.next([]);
          return;
        }
        if (user.role === UserRole.ADMIN) {
          this.items$.next([
            {
              label: 'users',
              url: '/admin/users',
            },
          ]);
        }
      }
    });
  }

  logout(): void {
    this.tokenService.clearToken();
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/login']);
  }
}
