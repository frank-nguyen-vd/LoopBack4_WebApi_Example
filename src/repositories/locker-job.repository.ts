import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  CollectionWorkflow,
  LockerInfo,
  LockerJob,
  LockerJobRelations,
  UserInfo,
} from '../models';
import { CollectionWorkflowRepository } from './collection-workflow.repository';
import { LockerInfoRepository } from './locker-info.repository';
import { UserInfoRepository } from './user-info.repository';

export class LockerJobRepository extends DefaultCrudRepository<
  LockerJob,
  typeof LockerJob.prototype.id,
  LockerJobRelations
> {
  public readonly collectionWorkflow: BelongsToAccessor<
    CollectionWorkflow,
    typeof LockerJob.prototype.id
  >;

  public readonly locker: BelongsToAccessor<
    LockerInfo,
    typeof LockerJob.prototype.id
  >;

  public readonly user: BelongsToAccessor<
    UserInfo,
    typeof LockerJob.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('CollectionWorkflowRepository')
    protected collectionWorkflowRepositoryGetter: Getter<CollectionWorkflowRepository>,
    @repository.getter('LockerInfoRepository')
    protected lockerInfoRepositoryGetter: Getter<LockerInfoRepository>,
    @repository.getter('UserInfoRepository')
    protected userInfoRepositoryGetter: Getter<UserInfoRepository>
  ) {
    super(LockerJob, dataSource);
    this.user = this.createBelongsToAccessorFor(
      'user',
      userInfoRepositoryGetter
    );
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.locker = this.createBelongsToAccessorFor(
      'locker',
      lockerInfoRepositoryGetter
    );
    this.registerInclusionResolver('locker', this.locker.inclusionResolver);
    this.collectionWorkflow = this.createBelongsToAccessorFor(
      'collectionWorkflow',
      collectionWorkflowRepositoryGetter
    );
    this.registerInclusionResolver(
      'collectionWorkflow',
      this.collectionWorkflow.inclusionResolver
    );
  }
}
