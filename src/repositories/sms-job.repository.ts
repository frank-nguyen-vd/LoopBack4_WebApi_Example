import { inject, Getter } from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  SmsJob,
  SmsJobRelations,
  UserInfo,
  RecipientInfo,
  CollectionWorkflow,
} from '../models';
import { UserInfoRepository } from './user-info.repository';
import { RecipientInfoRepository } from './recipient-info.repository';
import { CollectionWorkflowRepository } from './collection-workflow.repository';

export class SmsJobRepository extends DefaultCrudRepository<
  SmsJob,
  typeof SmsJob.prototype.id,
  SmsJobRelations
> {
  public readonly user: BelongsToAccessor<UserInfo, typeof SmsJob.prototype.id>;

  public readonly recipient: BelongsToAccessor<
    RecipientInfo,
    typeof SmsJob.prototype.id
  >;

  public readonly collectionWorkflow: BelongsToAccessor<
    CollectionWorkflow,
    typeof SmsJob.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('UserInfoRepository')
    protected userInfoRepositoryGetter: Getter<UserInfoRepository>,
    @repository.getter('RecipientInfoRepository')
    protected recipientInfoRepositoryGetter: Getter<RecipientInfoRepository>,
    @repository.getter('CollectionWorkflowRepository')
    protected collectionWorkflowRepositoryGetter: Getter<CollectionWorkflowRepository>
  ) {
    super(SmsJob, dataSource);
    this.collectionWorkflow = this.createBelongsToAccessorFor(
      'collectionWorkflow',
      collectionWorkflowRepositoryGetter
    );
    this.registerInclusionResolver(
      'collectionWorkflow',
      this.collectionWorkflow.inclusionResolver
    );
    this.recipient = this.createBelongsToAccessorFor(
      'recipient',
      recipientInfoRepositoryGetter
    );
    this.registerInclusionResolver(
      'recipient',
      this.recipient.inclusionResolver
    );
    this.user = this.createBelongsToAccessorFor(
      'user',
      userInfoRepositoryGetter
    );
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
