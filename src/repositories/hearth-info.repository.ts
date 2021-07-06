import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import { HearthInfo, HearthInfoRelations, DeceasedInfo } from '../models';
import { MssqlDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { DeceasedInfoRepository } from './deceased-info.repository';

export class HearthInfoRepository extends DefaultCrudRepository<
  HearthInfo,
  typeof HearthInfo.prototype.id,
  HearthInfoRelations
> {
  public readonly deceased: BelongsToAccessor<
    DeceasedInfo,
    typeof HearthInfo.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('DeceasedInfoRepository')
    protected deceasedInfoRepositoryGetter: Getter<DeceasedInfoRepository>
  ) {
    super(HearthInfo, dataSource);
    this.deceased = this.createBelongsToAccessorFor(
      'deceased',
      deceasedInfoRepositoryGetter
    );
    this.registerInclusionResolver('deceased', this.deceased.inclusionResolver);
  }
}
