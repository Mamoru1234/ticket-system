import { Service } from 'typedi';
import { LoggerUtils } from '../utils/LoggerUtils';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { GraphQLRequestContextWillSendResponse } from 'apollo-server-types';
import { AppContext } from '../constants/app-context.type';
import { QUERY_RUNNER_KEY } from '../services/database.service';
import { QueryRunner } from 'typeorm';

const logger = LoggerUtils.getLogger(__filename);

@Service()
export class ContextTransactionPlugin implements ApolloServerPlugin {
  requestDidStart() {
    return {
      willSendResponse: async (context: GraphQLRequestContextWillSendResponse<AppContext>): Promise<void> => {
        const queryRunner: QueryRunner = context.context.serverData[QUERY_RUNNER_KEY];
        if (!queryRunner) {
          logger.debug('No transaction in context');
          return;
        }
        if (context.errors && context.errors.length) {
          logger.debug('Error response transaction rollback');
          await queryRunner.rollbackTransaction();
          return;
        }
        logger.debug('Success response commit transaction');
        await queryRunner.commitTransaction();
      },
    }
  }
}
