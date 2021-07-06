import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  CremationWorkflow,
  CremationWorkflowInfo,
  CremationWorkflowRelations,
} from '../models';
import { CremationWorkflowInfoRepository } from './cremation-workflow-info.repository';

export class CremationWorkflowRepository extends DefaultCrudRepository<
  CremationWorkflow,
  typeof CremationWorkflow.prototype.id,
  CremationWorkflowRelations
> {
  public readonly workflowInfo: BelongsToAccessor<
    CremationWorkflowInfo,
    typeof CremationWorkflow.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('CremationWorkflowInfoRepository')
    protected cremationWorkflowInfoRepositoryGetter: Getter<CremationWorkflowInfoRepository>
  ) {
    super(CremationWorkflow, dataSource);
    this.workflowInfo = this.createBelongsToAccessorFor(
      'workflowInfo',
      cremationWorkflowInfoRepositoryGetter
    );
    this.registerInclusionResolver(
      'workflowInfo',
      this.workflowInfo.inclusionResolver
    );
  }
}
