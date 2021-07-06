import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  UserCredential,
  UserInfo,
  UserInfoRelations,
  GroupInfo,
} from '../models';
import { UserCredentialRepository } from './user-credential.repository';
import { GroupInfoRepository } from './group-info.repository';

export class UserInfoRepository extends DefaultCrudRepository<
  UserInfo,
  typeof UserInfo.prototype.id,
  UserInfoRelations
> {
  public readonly userCredential: BelongsToAccessor<
    UserCredential,
    typeof UserInfo.prototype.id
  >;

  public readonly group: BelongsToAccessor<
    GroupInfo,
    typeof UserInfo.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('UserCredentialRepository')
    protected userCredentialRepositoryGetter: Getter<UserCredentialRepository>,
    @repository.getter('GroupInfoRepository')
    protected groupInfoRepositoryGetter: Getter<GroupInfoRepository>
  ) {
    super(UserInfo, dataSource);
    this.group = this.createBelongsToAccessorFor(
      'group',
      groupInfoRepositoryGetter
    );
    this.registerInclusionResolver('group', this.group.inclusionResolver);
    this.userCredential = this.createBelongsToAccessorFor(
      'userCredential',
      userCredentialRepositoryGetter
    );
    this.registerInclusionResolver(
      'userCredential',
      this.userCredential.inclusionResolver
    );
  }
}
