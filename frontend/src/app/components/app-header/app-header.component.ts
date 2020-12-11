import { Component, OnInit } from '@angular/core';
import { AppHeaderStore, HeaderItem } from '../../stores/app-header.store';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Select(AppHeaderStore.items) items$!: Observable<HeaderItem[]>;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
