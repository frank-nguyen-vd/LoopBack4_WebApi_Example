import { DefaultCrudRepository } from '@loopback/repository';
import { PrinterInfo, PrinterInfoRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class PrinterInfoRepository extends DefaultCrudRepository<
  PrinterInfo,
  typeof PrinterInfo.prototype.id,
  PrinterInfoRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(PrinterInfo, dataSource);
  }
}
