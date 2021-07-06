import { DefaultCrudRepository } from '@loopback/repository';
import { TvInfo, TvInfoRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class TvInfoRepository extends DefaultCrudRepository<
  TvInfo,
  typeof TvInfo.prototype.id,
  TvInfoRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(TvInfo, dataSource);
  }
}
