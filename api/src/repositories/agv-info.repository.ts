import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import { AgvInfo, AgvInfoRelations } from '../models';

export class AgvInfoRepository extends DefaultCrudRepository<
  AgvInfo,
  typeof AgvInfo.prototype.id,
  AgvInfoRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(AgvInfo, dataSource);
  }
}
