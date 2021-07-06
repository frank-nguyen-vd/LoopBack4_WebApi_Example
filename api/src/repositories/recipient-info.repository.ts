import { DefaultCrudRepository } from '@loopback/repository';
import { RecipientInfo, RecipientInfoRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class RecipientInfoRepository extends DefaultCrudRepository<
  RecipientInfo,
  typeof RecipientInfo.prototype.id,
  RecipientInfoRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(RecipientInfo, dataSource);
  }
}
