import { DefaultCrudRepository } from '@loopback/repository';
import { MobileConsole, MobileConsoleRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class MobileConsoleRepository extends DefaultCrudRepository<
  MobileConsole,
  typeof MobileConsole.prototype.id,
  MobileConsoleRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(MobileConsole, dataSource);
  }
}
