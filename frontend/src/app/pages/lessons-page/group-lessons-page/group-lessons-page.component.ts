import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-group-lessons-page',
  templateUrl: './group-lessons-page.component.html',
  styleUrls: ['./group-lessons-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupLessonsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
