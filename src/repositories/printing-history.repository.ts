import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  PrinterJob,
  PrintingHistory,
  PrintingHistoryRelations,
  PrinterInfo,
  UserInfo,
} from '../models';
import { PrinterJobRepository } from './printer-job.repository';
import { PrinterInfoRepository } from './printer-info.repository';
import { UserInfoRepository } from './user-info.repository';

export class PrintingHistoryRepository extends DefaultCrudRepository<
  PrintingHistory,
  typeof PrintingHistory.prototype.id,
  PrintingHistoryRelations
> {
  public readonly printerJob: BelongsToAccessor<
    PrinterJob,
    typeof PrintingHistory.prototype.id
  >;

  public readonly printer: BelongsToAccessor<
    PrinterInfo,
    typeof PrintingHistory.prototype.id
  >;

  public readonly user: BelongsToAccessor<
    UserInfo,
    typeof PrintingHistory.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('PrinterJobRepository')
    protected printerJobRepositoryGetter: Getter<PrinterJobRepository>,
    @repository.getter('PrinterInfoRepository')
    protected printerInfoRepositoryGetter: Getter<PrinterInfoRepository>,
    @repository.getter('UserInfoRepository')
    protected userInfoRepositoryGetter: Getter<UserInfoRepository>
  ) {
    super(PrintingHistory, dataSource);
    this.user = this.createBelongsToAccessorFor(
      'user',
      userInfoRepositoryGetter
    );
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.printer = this.createBelongsToAccessorFor(
      'printer',
      printerInfoRepositoryGetter
    );
    this.registerInclusionResolver('printer', this.printer.inclusionResolver);
    this.printerJob = this.createBelongsToAccessorFor(
      'printerJob',
      printerJobRepositoryGetter
    );
    this.registerInclusionResolver(
      'printerJob',
      this.printerJob.inclusionResolver
    );
  }
}
