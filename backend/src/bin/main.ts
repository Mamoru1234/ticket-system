import 'reflect-metadata';
import { LoggerUtils } from '../utils/LoggerUtils';
import { Container } from 'typedi';
import { DatabaseService } from '../services/database.service';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { typeDefs } from '../type-def.schema';
import { ContextTransactionPlugin } from '../plugins/context-transaction.plugin';
import { AppContext } from '../constants/app-context.type';
import { UserService } from '../services/user/user.service';
import express from 'express';
import { SERVER_PORT } from '../config';
import { loggerMiddleware } from '../middlewares/logger.middleware';
import { AuthRoute } from '../routes/auth.route';
import cors from 'cors';

LoggerUtils.configure();
const logger = LoggerUtils.getLogger(__filename);

function getUserToken(request: express.Request): string | undefined {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return undefined;
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    throw new AuthenticationError('Token invalid');
  }
  return parts[1];
}

export async function main(): Promise<void> {
  const app = express();
  if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
  }
  app.use(loggerMiddleware);
  app.use('/auth', Container.get(AuthRoute).init());
  logger.info('Starting server...');
  const dbService = Container.get(DatabaseService);
  await dbService.connect();
  logger.info('Db connected');
  const server = new ApolloServer({
    typeDefs,
    resolvers: [Container.get(UserService).resolvers],
    context: (context): AppContext => {
      return {
        serverData: {},
        userToken: getUserToken(context.req),
      };
    },
    plugins: [
      Container.get(ContextTransactionPlugin),
    ],
  });
  server.applyMiddleware({
    app,
  });
  app.listen(SERVER_PORT, () => {
    logger.info('Server listening: ', SERVER_PORT);
  })
}

main().catch((e) => {
  logger.error('Error in main', e);
});
