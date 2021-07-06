import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  ButtonInfo,
  ButtonJob,
  ButtonJobRelations,
  CollectionWorkflow,
} from '../models';
import { ButtonInfoRepository } from './button-info.repository';
import { CollectionWorkflowRepository } from './collection-workflow.repository';

export class ButtonJobRepository extends DefaultCrudRepository<
  ButtonJob,
  typeof ButtonJob.prototype.id,
  ButtonJobRelations
> {
  public readonly button: BelongsToAccessor<
    ButtonInfo,
    typeof ButtonJob.prototype.id
  >;

  public readonly collectionWorkflow: BelongsToAccessor<
    CollectionWorkflow,
    typeof ButtonJob.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('ButtonInfoRepository')
    protected buttonInfoRepositoryGetter: Getter<ButtonInfoRepository>,
    @repository.getter('CollectionWorkflowRepository')
    protected collectionWorkflowRepositoryGetter: Getter<CollectionWorkflowRepository>
  ) {
    super(ButtonJob, dataSource);
    this.collectionWorkflow = this.createBelongsToAccessorFor(
      'collectionWorkflow',
      collectionWorkflowRepositoryGetter
    );
    this.registerInclusionResolver(
      'collectionWorkflow',
      this.collectionWorkflow.inclusionResolver
    );
    this.button = this.createBelongsToAccessorFor(
      'button',
      buttonInfoRepositoryGetter
    );
    this.registerInclusionResolver('button', this.button.inclusionResolver);
  }
}
