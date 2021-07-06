import { DefaultCrudRepository } from '@loopback/repository';
import { AccessLevel, AccessLevelRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class AccessLevelRepository extends DefaultCrudRepository<
  AccessLevel,
  typeof AccessLevel.prototype.alias,
  AccessLevelRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(AccessLevel, dataSource);
  }
}
