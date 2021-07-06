import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import { LockerInfo, LockerInfoRelations, DeceasedInfo } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { DeceasedInfoRepository } from './deceased-info.repository';

export class LockerInfoRepository extends DefaultCrudRepository<
  LockerInfo,
  typeof LockerInfo.prototype.id,
  LockerInfoRelations
> {
  public readonly deceased: BelongsToAccessor<
    DeceasedInfo,
    typeof LockerInfo.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('DeceasedInfoRepository')
    protected deceasedInfoRepositoryGetter: Getter<DeceasedInfoRepository>
  ) {
    super(LockerInfo, dataSource);
    this.deceased = this.createBelongsToAccessorFor(
      'deceased',
      deceasedInfoRepositoryGetter
    );
    this.registerInclusionResolver('deceased', this.deceased.inclusionResolver);
  }
}
