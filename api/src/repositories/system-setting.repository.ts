import { DefaultCrudRepository } from '@loopback/repository';
import { SystemSetting, SystemSettingRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class SystemSettingRepository extends DefaultCrudRepository<
  SystemSetting,
  typeof SystemSetting.prototype.id,
  SystemSettingRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(SystemSetting, dataSource);
  }
}
