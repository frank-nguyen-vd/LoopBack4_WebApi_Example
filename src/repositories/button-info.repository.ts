import { DefaultCrudRepository } from '@loopback/repository';
import { ButtonInfo, ButtonInfoRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class ButtonInfoRepository extends DefaultCrudRepository<
  ButtonInfo,
  typeof ButtonInfo.prototype.id,
  ButtonInfoRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(ButtonInfo, dataSource);
  }
}
