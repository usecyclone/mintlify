import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const domain = 'api.inkeep.com';
const inkeepPublicKey = 'c86476579d4d7544fb4257ba229ec480037572f3f79a8b58';

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: `wss://${domain}/graphql`,
          connectionParams: {
            headers: {
              Authorization: `Bearer ${inkeepPublicKey}`,
            },
          },
        })
      )
    : null;

const httpLink = new HttpLink({
  uri: `https://${domain}/graphql`,
  headers: {
    Authorization: `Bearer ${inkeepPublicKey}`,
  },
});

const splitLink =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

const link = ApolloLink.from([splitLink]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
