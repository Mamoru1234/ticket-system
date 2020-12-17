import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  constructor(
    private readonly apollo: Apollo,
  ) { }

  users$ = this.apollo.watchQuery({
    query: gql`{
      users {
        firstName
        lastName
      }
    }`
  }).valueChanges;

  ngOnInit(): void {
  }

}
