import { EntityTarget } from 'typeorm/common/EntityTarget';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { DeepPartial } from 'typeorm';

export interface TransactionOptions<T> {
  operationOptions: T;
  txn: EntityManager;
}

export abstract class AbstractDao<T> {
  abstract target: EntityTarget<T>;
  
  find(options: TransactionOptions<FindManyOptions<T>>) {
    return options.txn.getRepository(this.target).find(options.operationOptions);
  }

  save(data: DeepPartial<T>, txn: EntityManager) {
    return txn.getRepository(this.target).save(data);
  }
}
