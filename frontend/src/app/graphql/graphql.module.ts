import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../environments/environment';
import { AUTH_LINK, AUTH_LINK_PROVIDER } from './auth-link.provider';
import { TOKEN_INVALID_LINK, TOKEN_INVALID_LINK_PROVIDER } from './token-invalid-link.prodiver';

const uri = `${environment.apiUrl}/graphql`; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink, authLink: ApolloLink, tokenInvalidLink: ApolloLink): ApolloClientOptions<any> {
  return {
    link: ApolloLink.from([authLink, tokenInvalidLink, httpLink.create({uri})]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    AUTH_LINK_PROVIDER,
    TOKEN_INVALID_LINK_PROVIDER,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AUTH_LINK, TOKEN_INVALID_LINK],
    },
  ],
})
export class GraphQLModule {}
