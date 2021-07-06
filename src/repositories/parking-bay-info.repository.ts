import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import { HearthInfo, ParkingBayInfo, ParkingBayInfoRelations } from '../models';
import { HearthInfoRepository } from './hearth-info.repository';

export class ParkingBayInfoRepository extends DefaultCrudRepository<
  ParkingBayInfo,
  typeof ParkingBayInfo.prototype.id,
  ParkingBayInfoRelations
> {
  public readonly hearth: BelongsToAccessor<
    HearthInfo,
    typeof ParkingBayInfo.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('HearthInfoRepository')
    protected hearthInfoRepositoryGetter: Getter<HearthInfoRepository>
  ) {
    super(ParkingBayInfo, dataSource);
    this.hearth = this.createBelongsToAccessorFor(
      'hearth',
      hearthInfoRepositoryGetter
    );
    this.registerInclusionResolver('hearth', this.hearth.inclusionResolver);
  }
}
