import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {
  MultipleCasketInfo,
  MultipleCasketInfoRelations,
  ServiceHallInfo,
} from '../models';
import { MssqlDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { ServiceHallInfoRepository } from './service-hall-info.repository';

export class MultipleCasketInfoRepository extends DefaultCrudRepository<
  MultipleCasketInfo,
  typeof MultipleCasketInfo.prototype.id,
  MultipleCasketInfoRelations
> {
  public readonly serviceHall: BelongsToAccessor<
    ServiceHallInfo,
    typeof MultipleCasketInfo.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('ServiceHallInfoRepository')
    protected serviceHallInfoRepositoryGetter: Getter<ServiceHallInfoRepository>
  ) {
    super(MultipleCasketInfo, dataSource);
    this.serviceHall = this.createBelongsToAccessorFor(
      'serviceHall',
      serviceHallInfoRepositoryGetter
    );
    this.registerInclusionResolver(
      'serviceHall',
      this.serviceHall.inclusionResolver
    );
  }
}
