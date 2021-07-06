import { inject, Getter } from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  TvJob,
  TvJobRelations,
  TvInfo,
  CremationWorkflow,
  CollectionWorkflow,
} from '../models';
import { TvInfoRepository } from './tv-info.repository';
import { CremationWorkflowRepository } from './cremation-workflow.repository';
import { CollectionWorkflowRepository } from './collection-workflow.repository';

export class TvJobRepository extends DefaultCrudRepository<
  TvJob,
  typeof TvJob.prototype.id,
  TvJobRelations
> {
  public readonly tv: BelongsToAccessor<TvInfo, typeof TvJob.prototype.id>;

  public readonly cremationWorkflow: BelongsToAccessor<
    CremationWorkflow,
    typeof TvJob.prototype.id
  >;

  public readonly collectionWorkflow: BelongsToAccessor<
    CollectionWorkflow,
    typeof TvJob.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('TvInfoRepository')
    protected tvInfoRepositoryGetter: Getter<TvInfoRepository>,
    @repository.getter('CremationWorkflowRepository')
    protected cremationWorkflowRepositoryGetter: Getter<CremationWorkflowRepository>,
    @repository.getter('CollectionWorkflowRepository')
    protected collectionWorkflowRepositoryGetter: Getter<CollectionWorkflowRepository>
  ) {
    super(TvJob, dataSource);
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
    this.tv = this.createBelongsToAccessorFor('tv', tvInfoRepositoryGetter);
    this.registerInclusionResolver('tv', this.tv.inclusionResolver);
  }
}
