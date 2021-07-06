import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  CollectionWorkflowInfo,
  CollectionWorkflowInfoRelations,
  DeceasedInfo,
  HearthInfo,
  LockerInfo,
  OneIlsToPcms,
  RecipientInfo,
  RoomInfo,
} from '../models';
import { DeceasedInfoRepository } from './deceased-info.repository';
import { HearthInfoRepository } from './hearth-info.repository';
import { LockerInfoRepository } from './locker-info.repository';
import { OneIlsToPcmsRepository } from './one-ils-to-pcms.repository';
import { RecipientInfoRepository } from './recipient-info.repository';
import { RoomInfoRepository } from './room-info.repository';

export class CollectionWorkflowInfoRepository extends DefaultCrudRepository<
  CollectionWorkflowInfo,
  typeof CollectionWorkflowInfo.prototype.id,
  CollectionWorkflowInfoRelations
> {
  public readonly hearthCremain: BelongsToAccessor<
    HearthInfo,
    typeof CollectionWorkflowInfo.prototype.id
  >;

  public readonly hearthEmpty1: BelongsToAccessor<
    HearthInfo,
    typeof CollectionWorkflowInfo.prototype.id
  >;

  public readonly hearthEmpty2: BelongsToAccessor<
    HearthInfo,
    typeof CollectionWorkflowInfo.prototype.id
  >;

  public readonly deceased: BelongsToAccessor<
    DeceasedInfo,
    typeof CollectionWorkflowInfo.prototype.id
  >;

  public readonly oneIls: BelongsToAccessor<
    OneIlsToPcms,
    typeof CollectionWorkflowInfo.prototype.id
  >;

  public readonly room: BelongsToAccessor<
    RoomInfo,
    typeof CollectionWorkflowInfo.prototype.id
  >;

  public readonly locker: BelongsToAccessor<
    LockerInfo,
    typeof CollectionWorkflowInfo.prototype.id
  >;

  public readonly recipient: BelongsToAccessor<
    RecipientInfo,
    typeof CollectionWorkflowInfo.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('HearthInfoRepository')
    protected hearthInfoRepositoryGetter: Getter<HearthInfoRepository>,
    @repository.getter('DeceasedInfoRepository')
    protected deceasedInfoRepositoryGetter: Getter<DeceasedInfoRepository>,
    @repository.getter('OneIlsToPcmsRepository')
    protected oneIlsToPcmsRepositoryGetter: Getter<OneIlsToPcmsRepository>,
    @repository.getter('RoomInfoRepository')
    protected roomInfoRepositoryGetter: Getter<RoomInfoRepository>,
    @repository.getter('LockerInfoRepository')
    protected lockerInfoRepositoryGetter: Getter<LockerInfoRepository>,
    @repository.getter('RecipientInfoRepository')
    protected recipientInfoRepositoryGetter: Getter<RecipientInfoRepository>
  ) {
    super(CollectionWorkflowInfo, dataSource);
    this.recipient = this.createBelongsToAccessorFor(
      'recipient',
      recipientInfoRepositoryGetter
    );
    this.registerInclusionResolver(
      'recipient',
      this.recipient.inclusionResolver
    );

    this.hearthCremain = this.createBelongsToAccessorFor(
      'hearthCremain',
      hearthInfoRepositoryGetter
    );
    this.hearthEmpty1 = this.createBelongsToAccessorFor(
      'hearthEmpty1',
      hearthInfoRepositoryGetter
    );
    this.hearthEmpty2 = this.createBelongsToAccessorFor(
      'hearthEmpty2',
      hearthInfoRepositoryGetter
    );
    this.deceased = this.createBelongsToAccessorFor(
      'deceased',
      deceasedInfoRepositoryGetter
    );
    this.oneIls = this.createBelongsToAccessorFor(
      'oneIls',
      oneIlsToPcmsRepositoryGetter
    );
    this.room = this.createBelongsToAccessorFor(
      'room',
      roomInfoRepositoryGetter
    );
    this.locker = this.createBelongsToAccessorFor(
      'locker',
      lockerInfoRepositoryGetter
    );

    this.registerInclusionResolver(
      'hearthCremain',
      this.hearthCremain.inclusionResolver
    );
    this.registerInclusionResolver(
      'hearthEmpty1',
      this.hearthEmpty1.inclusionResolver
    );
    this.registerInclusionResolver(
      'hearthEmpty2',
      this.hearthEmpty2.inclusionResolver
    );
    this.registerInclusionResolver('deceased', this.deceased.inclusionResolver);
    this.registerInclusionResolver('oneIls', this.oneIls.inclusionResolver);
    this.registerInclusionResolver('room', this.room.inclusionResolver);
    this.registerInclusionResolver('locker', this.locker.inclusionResolver);
  }
}
