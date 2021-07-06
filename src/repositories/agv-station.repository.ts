import { DefaultCrudRepository } from '@loopback/repository';
import { AgvStation, AgvStationRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class AgvStationRepository extends DefaultCrudRepository<
  AgvStation,
  typeof AgvStation.prototype.id,
  AgvStationRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(AgvStation, dataSource);
  }
}
