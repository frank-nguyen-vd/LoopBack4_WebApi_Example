import { DefaultCrudRepository } from '@loopback/repository';
import { OneIlsToPcms, OneIlsToPcmsRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class OneIlsToPcmsRepository extends DefaultCrudRepository<
  OneIlsToPcms,
  typeof OneIlsToPcms.prototype.id,
  OneIlsToPcmsRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(OneIlsToPcms, dataSource);
  }
}
