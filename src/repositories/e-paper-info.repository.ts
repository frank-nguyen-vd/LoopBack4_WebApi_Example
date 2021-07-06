import { DefaultCrudRepository } from '@loopback/repository';
import { EPaperInfo, EPaperInfoRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class EPaperInfoRepository extends DefaultCrudRepository<
  EPaperInfo,
  typeof EPaperInfo.prototype.id,
  EPaperInfoRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(EPaperInfo, dataSource);
  }
}
