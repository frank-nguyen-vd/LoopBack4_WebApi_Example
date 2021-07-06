import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  DeceasedInfo,
  DeceasedInfoRelations,
  OneIlsToPcms,
  RecipientInfo,
} from '../models';
import { OneIlsToPcmsRepository } from './one-ils-to-pcms.repository';
import { RecipientInfoRepository } from './recipient-info.repository';

export class DeceasedInfoRepository extends DefaultCrudRepository<
  DeceasedInfo,
  typeof DeceasedInfo.prototype.id,
  DeceasedInfoRelations
> {
  public readonly oneIlsToPcms: BelongsToAccessor<
    OneIlsToPcms,
    typeof DeceasedInfo.prototype.id
  >;

  public readonly recipientInfo: BelongsToAccessor<
    RecipientInfo,
    typeof DeceasedInfo.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('OneIlsToPcmsRepository')
    protected oneIlsToPcmsRepositoryGetter: Getter<OneIlsToPcmsRepository>,
    @repository.getter('RecipientInfoRepository')
    protected recipientInfoRepositoryGetter: Getter<RecipientInfoRepository>
  ) {
    super(DeceasedInfo, dataSource);
    this.recipientInfo = this.createBelongsToAccessorFor(
      'recipientInfo',
      recipientInfoRepositoryGetter
    );
    this.registerInclusionResolver(
      'recipientInfo',
      this.recipientInfo.inclusionResolver
    );
    this.oneIlsToPcms = this.createBelongsToAccessorFor(
      'oneIlsToPcms',
      oneIlsToPcmsRepositoryGetter
    );
    this.registerInclusionResolver(
      'oneIlsToPcms',
      this.oneIlsToPcms.inclusionResolver
    );
  }
}
