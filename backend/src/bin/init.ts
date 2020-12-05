import { LoggerUtils } from '../utils/LoggerUtils';
import { Container } from 'typedi';
import { DatabaseService } from '../services/database.service';
import { DatabaseInitializerService } from '../services/database-initializer.service';

LoggerUtils.configure();
const logger = LoggerUtils.getLogger(__filename);

async function main(): Promise<void> {
  logger.info('Initializing db');
  const dbService = Container.get(DatabaseService);
  await dbService.connect();
  logger.info('Db connected');
  const dbInitializer = Container.get(DatabaseInitializerService);
  await dbInitializer.init();
  logger.info('Init completed');
  await dbService.close();
}

main().catch((e) => {
  logger.error('Error in main', e);
});
