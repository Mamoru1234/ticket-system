import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';

export class SetTokenAction {
  static readonly type = '[Token store] set token';
  constructor(public token: string) {
  }
}

export interface TokenStoreState {
  token: string;
}

@State<TokenStoreState>({
  name: 'tokenStore',
  defaults: {
    token: '',
  },
})
@Injectable()
export class TokenStore {
  @Selector()
  static token(state: TokenStoreState): string {
    return state.token;
  }
}
