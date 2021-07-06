import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { MssqlDataSource } from '../datasources';
import { MESSAGE } from '../keys';
import { AccessLevel, GroupInfo, GroupInfoRelations } from '../models';
import { AccessLevelRepository } from './access-level.repository';

export class GroupInfoRepository extends DefaultCrudRepository<
  GroupInfo,
  typeof GroupInfo.prototype.id,
  GroupInfoRelations
> {
  public readonly accessLevel: BelongsToAccessor<
    AccessLevel,
    typeof GroupInfo.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('AccessLevelRepository')
    protected accessLevelRepositoryGetter: Getter<AccessLevelRepository>
  ) {
    super(GroupInfo, dataSource);
    this.accessLevel = this.createBelongsToAccessorFor(
      'accessLevel',
      accessLevelRepositoryGetter
    );
    this.registerInclusionResolver(
      'accessLevel',
      this.accessLevel.inclusionResolver
    );
  }

  async increaseMembersCount(id: number): Promise<void> {
    const foundGroup = await this.findOne({ where: { id } });
    if (!foundGroup) {
      throw new HttpErrors.BadRequest(MESSAGE.GROUP.NOT_EXISTS);
    }
    this.updateById(id, { numberOfMembers: foundGroup.numberOfMembers + 1 });
  }

  async decreaseMembersCount(id: number): Promise<void> {
    const foundGroup = await this.findOne({ where: { id } });
    if (!foundGroup) {
      throw new HttpErrors.BadRequest(MESSAGE.GROUP.NOT_EXISTS);
    }
    this.updateById(id, { numberOfMembers: foundGroup.numberOfMembers - 1 });
  }
}
