import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import { RoomInfo, RoomInfoRelations, HearthInfo } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { HearthInfoRepository } from './hearth-info.repository';

export class RoomInfoRepository extends DefaultCrudRepository<
  RoomInfo,
  typeof RoomInfo.prototype.id,
  RoomInfoRelations
> {
  public readonly hearth: BelongsToAccessor<
    HearthInfo,
    typeof RoomInfo.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('HearthInfoRepository')
    protected hearthInfoRepositoryGetter: Getter<HearthInfoRepository>
  ) {
    super(RoomInfo, dataSource);
    this.hearth = this.createBelongsToAccessorFor(
      'hearth',
      hearthInfoRepositoryGetter
    );
    this.registerInclusionResolver('hearth', this.hearth.inclusionResolver);
  }
}
