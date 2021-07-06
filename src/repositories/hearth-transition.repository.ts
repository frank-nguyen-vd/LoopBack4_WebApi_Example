import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {
  HearthTransition,
  HearthTransitionRelations,
  HearthInfo,
  AgvJob, AgvStation} from '../models';
import { MssqlDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { HearthInfoRepository } from './hearth-info.repository';
import { AgvJobRepository } from './agv-job.repository';
import {AgvStationRepository} from './agv-station.repository';

export class HearthTransitionRepository extends DefaultCrudRepository<
  HearthTransition,
  typeof HearthTransition.prototype.id,
  HearthTransitionRelations
> {
  public readonly hearth: BelongsToAccessor<
    HearthInfo,
    typeof HearthTransition.prototype.id
  >;

  public readonly agvJob: BelongsToAccessor<
    AgvJob,
    typeof HearthTransition.prototype.id
  >;

  public readonly destination1: BelongsToAccessor<AgvStation, typeof HearthTransition.prototype.id>;

  public readonly destination2: BelongsToAccessor<AgvStation, typeof HearthTransition.prototype.id>;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('HearthInfoRepository')
    protected hearthInfoRepositoryGetter: Getter<HearthInfoRepository>,
    @repository.getter('AgvJobRepository')
    protected agvJobRepositoryGetter: Getter<AgvJobRepository>, @repository.getter('AgvStationRepository') protected agvStationRepositoryGetter: Getter<AgvStationRepository>,
  ) {
    super(HearthTransition, dataSource);
    this.destination2 = this.createBelongsToAccessorFor('destination2', agvStationRepositoryGetter,);
    this.registerInclusionResolver('destination2', this.destination2.inclusionResolver);
    this.destination1 = this.createBelongsToAccessorFor('destination1', agvStationRepositoryGetter,);
    this.registerInclusionResolver('destination1', this.destination1.inclusionResolver);
    this.agvJob = this.createBelongsToAccessorFor(
      'agvJob',
      agvJobRepositoryGetter
    );
    this.registerInclusionResolver('agvJob', this.agvJob.inclusionResolver);
    this.hearth = this.createBelongsToAccessorFor(
      'hearth',
      hearthInfoRepositoryGetter
    );
    this.registerInclusionResolver('hearth', this.hearth.inclusionResolver);
  }
}
