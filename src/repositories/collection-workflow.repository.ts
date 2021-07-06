import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  CollectionWorkflow,
  CollectionWorkflowInfo,
  CollectionWorkflowRelations,
} from '../models';
import { CollectionWorkflowInfoRepository } from './collection-workflow-info.repository';

export class CollectionWorkflowRepository extends DefaultCrudRepository<
  CollectionWorkflow,
  typeof CollectionWorkflow.prototype.id,
  CollectionWorkflowRelations
> {
  public readonly workflowInfo: BelongsToAccessor<
    CollectionWorkflowInfo,
    typeof CollectionWorkflow.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('CollectionWorkflowInfoRepository')
    protected collectionWorkflowInfoRepositoryGetter: Getter<CollectionWorkflowInfoRepository>
  ) {
    super(CollectionWorkflow, dataSource);
    this.workflowInfo = this.createBelongsToAccessorFor(
      'workflowInfo',
      collectionWorkflowInfoRepositoryGetter
    );
    this.registerInclusionResolver(
      'workflowInfo',
      this.workflowInfo.inclusionResolver
    );
  }
}
