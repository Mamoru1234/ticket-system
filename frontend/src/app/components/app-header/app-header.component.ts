import { Component, OnInit } from '@angular/core';
import { AppHeaderStore, HeaderItem } from '../../stores/app-header.store';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Select(AppHeaderStore.items) items$!: Observable<HeaderItem[]>;

  constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.tokenService.clearToken();
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/login']);
  }
}
