import { ConfigService } from '@nestjs/config';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';

import { join } from 'path';

function lowercaseKeys(obj) {
  const newObject = {};

  Object.keys(obj).forEach((key) => {
    newObject[key.toLowerCase()] = obj[key];
  });

  return newObject;
}

export class GraphQLConfig implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public async createGqlOptions(): Promise<ApolloDriverConfig> {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, extra, connectionParams }) => {
        if (extra?.request) {
          return {
            req: {
              ...extra?.request,
              headers: {
                ...lowercaseKeys(extra?.request?.headers),
                ...(connectionParams && lowercaseKeys(connectionParams)),
              },
            },
          };
        }

        return { req };
      },
      introspection: true,
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
      playground: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams: Record<string, any>) => {
            return { req: { headers: lowercaseKeys(connectionParams) } };
          },
        },
        'graphql-ws': true,
      },
    };
  }
}
