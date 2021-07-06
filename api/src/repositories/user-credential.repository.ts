import { DefaultCrudRepository } from '@loopback/repository';
import { UserCredential, UserCredentialRelations } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UserCredentialRepository extends DefaultCrudRepository<
  UserCredential,
  typeof UserCredential.prototype.id,
  UserCredentialRelations
> {
  constructor(@inject('datasources.Mssql') dataSource: MssqlDataSource) {
    super(UserCredential, dataSource);
  }
}
