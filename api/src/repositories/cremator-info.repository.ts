import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {
  CrematorInfo,
  CrematorInfoRelations,
  HearthInfo,
  ServiceHallInfo,
} from '../models';
import { MssqlDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { HearthInfoRepository } from './hearth-info.repository';
import { ServiceHallInfoRepository } from './service-hall-info.repository';

export class CrematorInfoRepository extends DefaultCrudRepository<
  CrematorInfo,
  typeof CrematorInfo.prototype.id,
  CrematorInfoRelations
> {
  public readonly hearth: BelongsToAccessor<
    HearthInfo,
    typeof CrematorInfo.prototype.id
  >;

  public readonly serviceHall: BelongsToAccessor<
    ServiceHallInfo,
    typeof CrematorInfo.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('HearthInfoRepository')
    protected hearthInfoRepositoryGetter: Getter<HearthInfoRepository>,
    @repository.getter('ServiceHallInfoRepository')
    protected serviceHallInfoRepositoryGetter: Getter<ServiceHallInfoRepository>
  ) {
    super(CrematorInfo, dataSource);
    this.serviceHall = this.createBelongsToAccessorFor(
      'serviceHall',
      serviceHallInfoRepositoryGetter
    );
    this.registerInclusionResolver(
      'serviceHall',
      this.serviceHall.inclusionResolver
    );
    this.hearth = this.createBelongsToAccessorFor(
      'hearth',
      hearthInfoRepositoryGetter
    );
    this.registerInclusionResolver('hearth', this.hearth.inclusionResolver);
  }
}
