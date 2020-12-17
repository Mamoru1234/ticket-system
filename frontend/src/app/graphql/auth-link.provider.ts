import { InjectionToken, Provider } from '@angular/core';
import { ApolloLink } from '@apollo/client/core';
import { TokenService } from '../services/token.service';
import { setContext } from '@apollo/client/link/context';

export const AUTH_LINK = new InjectionToken<ApolloLink>('APOLLO_AUTH_LINK');

function createAuthLink(tokenService: TokenService): ApolloLink {
  return setContext(() => {
    const token = tokenService.getToken();

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });
}

export const AUTH_LINK_PROVIDER: Provider = {
  provide: AUTH_LINK,
  deps: [TokenService],
  useFactory: createAuthLink,
};
