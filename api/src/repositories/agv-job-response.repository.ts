import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MssqlDataSource} from '../datasources';
import {AgvJobResponse, AgvJobResponseRelations} from '../models';

export class AgvJobResponseRepository extends DefaultCrudRepository<
  AgvJobResponse,
  typeof AgvJobResponse.prototype.id,
  AgvJobResponseRelations
> {
  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
  ) {
    super(AgvJobResponse, dataSource);
  }
}
