import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import { AlertJob, AlertJobRelations } from '../models';

export class AlertJobRepository extends DefaultCrudRepository<
  AlertJob,
  typeof AlertJob.prototype.id,
  AlertJobRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(AlertJob, dataSource);
  }
}
