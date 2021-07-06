import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  CollectionWorkflow,
  CremationWorkflow,
  ScannerInfo,
  ScannerJob,
  ScannerJobRelations,
  UserInfo,
} from '../models';
import { CollectionWorkflowRepository } from './collection-workflow.repository';
import { CremationWorkflowRepository } from './cremation-workflow.repository';
import { ScannerInfoRepository } from './scanner-info.repository';
import { UserInfoRepository } from './user-info.repository';

export class ScannerJobRepository extends DefaultCrudRepository<
  ScannerJob,
  typeof ScannerJob.prototype.id,
  ScannerJobRelations
> {
  public readonly cremationWorkflow: BelongsToAccessor<
    CremationWorkflow,
    typeof ScannerJob.prototype.id
  >;

  public readonly collectionWorkflow: BelongsToAccessor<
    CollectionWorkflow,
    typeof ScannerJob.prototype.id
  >;

  public readonly scanner: BelongsToAccessor<
    ScannerInfo,
    typeof ScannerJob.prototype.id
  >;

  public readonly user: BelongsToAccessor<
    UserInfo,
    typeof ScannerJob.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('CremationWorkflowRepository')
    protected cremationWorkflowRepositoryGetter: Getter<CremationWorkflowRepository>,
    @repository.getter('CollectionWorkflowRepository')
    protected collectionWorkflowRepositoryGetter: Getter<CollectionWorkflowRepository>,
    @repository.getter('ScannerInfoRepository')
    protected scannerInfoRepositoryGetter: Getter<ScannerInfoRepository>,
    @repository.getter('UserInfoRepository')
    protected userInfoRepositoryGetter: Getter<UserInfoRepository>
  ) {
    super(ScannerJob, dataSource);
    this.user = this.createBelongsToAccessorFor(
      'user',
      userInfoRepositoryGetter
    );
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.scanner = this.createBelongsToAccessorFor(
      'scanner',
      scannerInfoRepositoryGetter
    );
    this.registerInclusionResolver('scanner', this.scanner.inclusionResolver);
    this.collectionWorkflow = this.createBelongsToAccessorFor(
      'collectionWorkflow',
      collectionWorkflowRepositoryGetter
    );
    this.registerInclusionResolver(
      'collectionWorkflow',
      this.collectionWorkflow.inclusionResolver
    );
    this.cremationWorkflow = this.createBelongsToAccessorFor(
      'cremationWorkflow',
      cremationWorkflowRepositoryGetter
    );
    this.registerInclusionResolver(
      'cremationWorkflow',
      this.cremationWorkflow.inclusionResolver
    );
  }
}
