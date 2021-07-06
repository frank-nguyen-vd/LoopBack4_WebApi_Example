import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MssqlDataSource} from '../datasources';
import {ReportInfo, ReportInfoRelations, UserInfo} from '../models';
import {UserInfoRepository} from './user-info.repository';

export class ReportInfoRepository extends DefaultCrudRepository<
  ReportInfo,
  typeof ReportInfo.prototype.id,
  ReportInfoRelations
> {

  public readonly user: BelongsToAccessor<UserInfo, typeof ReportInfo.prototype.id>;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource, @repository.getter('UserInfoRepository') protected userInfoRepositoryGetter: Getter<UserInfoRepository>,
  ) {
    super(ReportInfo, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userInfoRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
