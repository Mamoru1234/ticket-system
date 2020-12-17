import { InjectionToken, Provider } from '@angular/core';
import { ApolloLink } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { TokenService } from '../services/token.service';
import { LoginPageService } from '../services/login-page.service';
import { GraphQLError } from 'graphql';

export const TOKEN_INVALID_LINK = new InjectionToken<ApolloLink>('APOLLO_TOKEN_INVALID_LINK');

function isTokenInvalidError(error: GraphQLError): boolean {
  return error.message === 'Token invalid';
}

function createInvalidTokenLink(tokenService: TokenService, loginPageService: LoginPageService): ApolloLink {
  return onError(({ graphQLErrors }) => {
    if (!graphQLErrors || !graphQLErrors.length) {
      return;
    }
    const hasInvalidToken = graphQLErrors.some(isTokenInvalidError);
    if (hasInvalidToken) {
      tokenService.clearToken();
      loginPageService.redirectToLoginPage();
    }
  });
}

export const TOKEN_INVALID_LINK_PROVIDER: Provider = {
  provide: TOKEN_INVALID_LINK,
  deps: [TokenService, LoginPageService],
  useFactory: createInvalidTokenLink,
};
