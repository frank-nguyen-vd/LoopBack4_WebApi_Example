import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {
  ServiceHallInfo,
  ServiceHallInfoRelations,
  TvInfo,
  ScannerInfo,
} from '../models';
import { MssqlDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { TvInfoRepository } from './tv-info.repository';
import { ScannerInfoRepository } from './scanner-info.repository';

export class ServiceHallInfoRepository extends DefaultCrudRepository<
  ServiceHallInfo,
  typeof ServiceHallInfo.prototype.id,
  ServiceHallInfoRelations
> {
  public readonly tv: BelongsToAccessor<
    TvInfo,
    typeof ServiceHallInfo.prototype.id
  >;

  public readonly hearseScanner: BelongsToAccessor<
    ScannerInfo,
    typeof ServiceHallInfo.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('TvInfoRepository')
    protected tvInfoRepositoryGetter: Getter<TvInfoRepository>,
    @repository.getter('ScannerInfoRepository')
    protected scannerInfoRepositoryGetter: Getter<ScannerInfoRepository>
  ) {
    super(ServiceHallInfo, dataSource);
    this.hearseScanner = this.createBelongsToAccessorFor(
      'hearseScanner',
      scannerInfoRepositoryGetter
    );
    this.registerInclusionResolver(
      'hearseScanner',
      this.hearseScanner.inclusionResolver
    );
    this.tv = this.createBelongsToAccessorFor('tv', tvInfoRepositoryGetter);
    this.registerInclusionResolver('tv', this.tv.inclusionResolver);
  }
}
