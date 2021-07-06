import { DefaultCrudRepository } from '@loopback/repository';
import { ScannerInfo, ScannerInfoRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class ScannerInfoRepository extends DefaultCrudRepository<
  ScannerInfo,
  typeof ScannerInfo.prototype.id,
  ScannerInfoRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(ScannerInfo, dataSource);
  }
}
