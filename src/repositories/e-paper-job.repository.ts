import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  CremationWorkflow,
  EPaperInfo,
  EPaperJob,
  EPaperJobRelations,
  CollectionWorkflow,
} from '../models';
import { CremationWorkflowRepository } from './cremation-workflow.repository';
import { EPaperInfoRepository } from './e-paper-info.repository';
import { CollectionWorkflowRepository } from './collection-workflow.repository';

export class EPaperJobRepository extends DefaultCrudRepository<
  EPaperJob,
  typeof EPaperJob.prototype.id,
  EPaperJobRelations
> {
  public readonly ePaper: BelongsToAccessor<
    EPaperInfo,
    typeof EPaperJob.prototype.id
  >;

  public readonly cremationWorkflow: BelongsToAccessor<
    CremationWorkflow,
    typeof EPaperJob.prototype.id
  >;

  public readonly collectionWorkflow: BelongsToAccessor<
    CollectionWorkflow,
    typeof EPaperJob.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('EPaperInfoRepository')
    protected ePaperInfoRepositoryGetter: Getter<EPaperInfoRepository>,
    @repository.getter('CremationWorkflowRepository')
    protected cremationWorkflowRepositoryGetter: Getter<CremationWorkflowRepository>,
    @repository.getter('CollectionWorkflowRepository')
    protected collectionWorkflowRepositoryGetter: Getter<CollectionWorkflowRepository>
  ) {
    super(EPaperJob, dataSource);
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
    this.ePaper = this.createBelongsToAccessorFor(
      'ePaper',
      ePaperInfoRepositoryGetter
    );
    this.registerInclusionResolver('ePaper', this.ePaper.inclusionResolver);
  }
}
