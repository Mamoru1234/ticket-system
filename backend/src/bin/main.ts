import 'reflect-metadata';
import { LoggerUtils } from '../utils/LoggerUtils';
import { Container } from 'typedi';
import { DatabaseService } from '../services/database.service';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from '../type-def.schema';
import { ContextTransactionPlugin } from '../plugins/context-transaction.plugin';
import { AppContext } from '../constants/app-context.type';
import { UserService } from '../services/user.service';
import { UserRole } from '../constants/user-role.enum';

LoggerUtils.configure();
const logger = LoggerUtils.getLogger(__filename);

const resolvers = {
  Query: {
    users: async (_parent: unknown, _args: unknown, context: AppContext) => {
      const entityManager = await Container.get(DatabaseService).getEntityManager(context);
      await Container.get(UserService).registerUser({
        password: 'user',
        firstName: 'Anna',
        lastName: 'Gontar',
        role: UserRole.STUDENT,
        email: 'correct_student@mail.com',
      }, entityManager);
      const user = await Container.get(UserService).registerUser({
        password: 'user',
        firstName: 'Anna',
        lastName: 'Gontar',
        role: UserRole.STUDENT,
        email: 'correct_new_student@mail.com',
      }, entityManager);
      return [user];
    },
  }
};

export async function main(): Promise<void> {
  logger.info('Starting server...');
  const dbService = Container.get(DatabaseService);
  await dbService.connect();
  logger.info('Db connected');
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({serverData: {}}),
    plugins: [
      Container.get(ContextTransactionPlugin),
    ],
  });
  const { url } = await server.listen();
  logger.info(`Server url: ${url}`);
}

main().catch((e) => {
  logger.error('Error in main', e);
});
