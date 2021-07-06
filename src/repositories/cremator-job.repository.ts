import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  CremationWorkflow,
  CrematorInfo,
  CrematorJob,
  CrematorJobRelations,
} from '../models';
import { CremationWorkflowRepository } from './cremation-workflow.repository';
import { CrematorInfoRepository } from './cremator-info.repository';

export class CrematorJobRepository extends DefaultCrudRepository<
  CrematorJob,
  typeof CrematorJob.prototype.id,
  CrematorJobRelations
> {
  public readonly cremationWorkflow: BelongsToAccessor<
    CremationWorkflow,
    typeof CrematorJob.prototype.id
  >;

  public readonly crematorInfo: BelongsToAccessor<
    CrematorInfo,
    typeof CrematorJob.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('CremationWorkflowRepository')
    protected cremationWorkflowRepositoryGetter: Getter<CremationWorkflowRepository>,
    @repository.getter('CrematorInfoRepository')
    protected crematorInfoRepositoryGetter: Getter<CrematorInfoRepository>
  ) {
    super(CrematorJob, dataSource);
    this.crematorInfo = this.createBelongsToAccessorFor(
      'crematorInfo',
      crematorInfoRepositoryGetter
    );
    this.registerInclusionResolver(
      'crematorInfo',
      this.crematorInfo.inclusionResolver
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
