import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  CollectionWorkflow,
  PrinterInfo,
  PrinterJob,
  PrinterJobRelations,
  UserInfo,
} from '../models';
import { CollectionWorkflowRepository } from './collection-workflow.repository';
import { PrinterInfoRepository } from './printer-info.repository';
import { UserInfoRepository } from './user-info.repository';

export class PrinterJobRepository extends DefaultCrudRepository<
  PrinterJob,
  typeof PrinterJob.prototype.id,
  PrinterJobRelations
> {
  public readonly user: BelongsToAccessor<
    UserInfo,
    typeof PrinterJob.prototype.id
  >;

  public readonly printer: BelongsToAccessor<
    PrinterInfo,
    typeof PrinterJob.prototype.id
  >;

  public readonly collectionWorkflow: BelongsToAccessor<
    CollectionWorkflow,
    typeof PrinterJob.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('UserInfoRepository')
    protected userInfoRepositoryGetter: Getter<UserInfoRepository>,
    @repository.getter('PrinterInfoRepository')
    protected printerInfoRepositoryGetter: Getter<PrinterInfoRepository>,
    @repository.getter('CollectionWorkflowRepository')
    protected collectionWorkflowRepositoryGetter: Getter<CollectionWorkflowRepository>
  ) {
    super(PrinterJob, dataSource);
    this.collectionWorkflow = this.createBelongsToAccessorFor(
      'collectionWorkflow',
      collectionWorkflowRepositoryGetter
    );
    this.registerInclusionResolver(
      'collectionWorkflow',
      this.collectionWorkflow.inclusionResolver
    );
    this.printer = this.createBelongsToAccessorFor(
      'printer',
      printerInfoRepositoryGetter
    );
    this.registerInclusionResolver('printer', this.printer.inclusionResolver);
    this.user = this.createBelongsToAccessorFor(
      'user',
      userInfoRepositoryGetter
    );
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
