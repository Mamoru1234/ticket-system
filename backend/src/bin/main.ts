import 'reflect-metadata';
import { LoggerUtils } from '../utils/LoggerUtils';
import { Container } from 'typedi';
import { DatabaseService } from '../services/database.service';
import { DatabaseInitializerService } from '../services/database-initializer.service';

LoggerUtils.configure();
const logger = LoggerUtils.getLogger(__filename);

export async function main(): Promise<void> {
  logger.info('Starting server...');
  const dbService = Container.get(DatabaseService);
  await dbService.connect();
  logger.info('Db connected');
  const dbInitializer = Container.get(DatabaseInitializerService);
  await dbInitializer.init();
  console.log('Url: ', url);
}

main().catch((e) => {
  logger.error('Error in main', e);
});
