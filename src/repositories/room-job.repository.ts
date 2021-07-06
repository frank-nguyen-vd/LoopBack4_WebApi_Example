import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  CollectionWorkflow,
  RoomInfo,
  RoomJob,
  RoomJobRelations,
  LockerInfo,
} from '../models';
import { CollectionWorkflowRepository } from './collection-workflow.repository';
import { RoomInfoRepository } from './room-info.repository';
import { LockerInfoRepository } from './locker-info.repository';

export class RoomJobRepository extends DefaultCrudRepository<
  RoomJob,
  typeof RoomJob.prototype.id,
  RoomJobRelations
> {
  public readonly collectionWorkflow: BelongsToAccessor<
    CollectionWorkflow,
    typeof RoomJob.prototype.id
  >;

  public readonly room: BelongsToAccessor<
    RoomInfo,
    typeof RoomJob.prototype.id
  >;

  public readonly lockerInfo: BelongsToAccessor<
    LockerInfo,
    typeof RoomJob.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('CollectionWorkflowRepository')
    protected collectionWorkflowRepositoryGetter: Getter<CollectionWorkflowRepository>,
    @repository.getter('RoomInfoRepository')
    protected roomInfoRepositoryGetter: Getter<RoomInfoRepository>,
    @repository.getter('LockerInfoRepository')
    protected lockerInfoRepositoryGetter: Getter<LockerInfoRepository>
  ) {
    super(RoomJob, dataSource);
    this.lockerInfo = this.createBelongsToAccessorFor(
      'lockerInfo',
      lockerInfoRepositoryGetter
    );
    this.registerInclusionResolver(
      'lockerInfo',
      this.lockerInfo.inclusionResolver
    );
    this.room = this.createBelongsToAccessorFor(
      'room',
      roomInfoRepositoryGetter
    );
    this.registerInclusionResolver('room', this.room.inclusionResolver);
    this.collectionWorkflow = this.createBelongsToAccessorFor(
      'collectionWorkflow',
      collectionWorkflowRepositoryGetter
    );
    this.registerInclusionResolver(
      'collectionWorkflow',
      this.collectionWorkflow.inclusionResolver
    );
  }
}
