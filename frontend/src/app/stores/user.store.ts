import { UserResponse } from '../services/rest-api/dto/user.endpoint';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

export interface UsersState {
  currentUser?: UserResponse;
}

export class SaveCurrentUser {
  static readonly type = '[USer store] save current user';
  constructor(public user: UserResponse) {
  }
}

@State<UsersState>({
  name: 'users',
  defaults: {},
})
@Injectable()
export class UserStore {

  @Selector()
  static currentUser(state: UsersState): UserResponse | undefined {
    return state.currentUser;
  }

  @Action(SaveCurrentUser)
  saveCurrentUser(ctx: StateContext<UsersState>, action: SaveCurrentUser): void {
    ctx.patchState({
      currentUser: action.user,
    });
  }
}
