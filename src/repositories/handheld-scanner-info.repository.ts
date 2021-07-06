import { DefaultCrudRepository } from '@loopback/repository';
import { HandheldScannerInfo, HandheldScannerInfoRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class HandheldScannerInfoRepository extends DefaultCrudRepository<
  HandheldScannerInfo,
  typeof HandheldScannerInfo.prototype.id,
  HandheldScannerInfoRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(HandheldScannerInfo, dataSource);
  }
}
