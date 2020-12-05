import 'reflect-metadata';
import { LoggerUtils } from '../utils/LoggerUtils';
import { Container } from 'typedi';
import { DatabaseService } from '../services/database.service';
import { ApolloServer } from 'apollo-server';
import { UserEntity } from '../models/entity/user.entity';
import { typeDefs } from '../type-def.schema';

LoggerUtils.configure();
const logger = LoggerUtils.getLogger(__filename);

const resolvers = {
  Query: {
    users: () => Container.get(DatabaseService).getRepository(UserEntity).find(),
  }
};

export async function main(): Promise<void> {
  logger.info('Starting server...');
  const dbService = Container.get(DatabaseService);
  await dbService.connect();
  logger.info('Db connected');
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await server.listen();
  logger.info(`Server url: ${url}`);
}

main().catch((e) => {
  logger.error('Error in main', e);
});
