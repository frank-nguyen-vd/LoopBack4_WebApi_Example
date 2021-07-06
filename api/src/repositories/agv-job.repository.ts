import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  AgvJob,
  AgvJobRelations,
  CollectionWorkflow,
  CremationWorkflow,
  AgvInfo,
} from '../models';
import { CollectionWorkflowRepository } from './collection-workflow.repository';
import { CremationWorkflowRepository } from './cremation-workflow.repository';
import { AgvInfoRepository } from './agv-info.repository';

export class AgvJobRepository extends DefaultCrudRepository<
  AgvJob,
  typeof AgvJob.prototype.id,
  AgvJobRelations
> {
  public readonly cremationWorkflow: BelongsToAccessor<
    CremationWorkflow,
    typeof AgvJob.prototype.id
  >;

  public readonly collectionWorkflow: BelongsToAccessor<
    CollectionWorkflow,
    typeof AgvJob.prototype.id
  >;

  public readonly agv: BelongsToAccessor<AgvInfo, typeof AgvJob.prototype.id>;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('CremationWorkflowRepository')
    protected cremationWorkflowRepositoryGetter: Getter<CremationWorkflowRepository>,
    @repository.getter('CollectionWorkflowRepository')
    protected collectionWorkflowRepositoryGetter: Getter<CollectionWorkflowRepository>,
    @repository.getter('AgvInfoRepository')
    protected agvInfoRepositoryGetter: Getter<AgvInfoRepository>
  ) {
    super(AgvJob, dataSource);
    this.agv = this.createBelongsToAccessorFor('agv', agvInfoRepositoryGetter);
    this.registerInclusionResolver('agv', this.agv.inclusionResolver);
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
