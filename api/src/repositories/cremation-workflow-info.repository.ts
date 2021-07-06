import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import { MssqlDataSource } from '../datasources';
import {
  CremationWorkflowInfo,
  CremationWorkflowInfoRelations,
  DeceasedInfo,
  HearthInfo,
  OneIlsToPcms,
  ServiceHallInfo,
  AgvStation,
  CrematorInfo,
  MultipleCasketInfo,
} from '../models';
import { DeceasedInfoRepository } from './deceased-info.repository';
import { HearthInfoRepository } from './hearth-info.repository';
import { OneIlsToPcmsRepository } from './one-ils-to-pcms.repository';
import { ServiceHallInfoRepository } from './service-hall-info.repository';
import { AgvStationRepository } from './agv-station.repository';
import { CrematorInfoRepository } from './cremator-info.repository';
import { MultipleCasketInfoRepository } from './multiple-casket-info.repository';

export class CremationWorkflowInfoRepository extends DefaultCrudRepository<
  CremationWorkflowInfo,
  typeof CremationWorkflowInfo.prototype.id,
  CremationWorkflowInfoRelations
> {
  public readonly deceased: BelongsToAccessor<
    DeceasedInfo,
    typeof CremationWorkflowInfo.prototype.id
  >;

  public readonly hearth: BelongsToAccessor<
    HearthInfo,
    typeof CremationWorkflowInfo.prototype.id
  >;

  public readonly oneIlsToPcms: BelongsToAccessor<
    OneIlsToPcms,
    typeof CremationWorkflowInfo.prototype.id
  >;

  public readonly serviceHall: BelongsToAccessor<
    ServiceHallInfo,
    typeof CremationWorkflowInfo.prototype.id
  >;

  public readonly agvServiceHall: BelongsToAccessor<
    AgvStation,
    typeof CremationWorkflowInfo.prototype.id
  >;

  public readonly agvTransferHall: BelongsToAccessor<
    AgvStation,
    typeof CremationWorkflowInfo.prototype.id
  >;

  public readonly agvInsertionChamber: BelongsToAccessor<
    AgvStation,
    typeof CremationWorkflowInfo.prototype.id
  >;

  public readonly cremator: BelongsToAccessor<
    CrematorInfo,
    typeof CremationWorkflowInfo.prototype.id
  >;

  public readonly multipleCasketInfo: BelongsToAccessor<
    MultipleCasketInfo,
    typeof CremationWorkflowInfo.prototype.id
  >;

  constructor(
    @inject('datasources.Mssql') dataSource: MssqlDataSource,
    @repository.getter('DeceasedInfoRepository')
    protected deceasedInfoRepositoryGetter: Getter<DeceasedInfoRepository>,
    @repository.getter('HearthInfoRepository')
    protected hearthInfoRepositoryGetter: Getter<HearthInfoRepository>,
    @repository.getter('OneIlsToPcmsRepository')
    protected oneIlsToPcmsRepositoryGetter: Getter<OneIlsToPcmsRepository>,
    @repository.getter('ServiceHallInfoRepository')
    protected serviceHallInfoRepositoryGetter: Getter<ServiceHallInfoRepository>,
    @repository.getter('AgvStationRepository')
    protected agvStationRepositoryGetter: Getter<AgvStationRepository>,
    @repository.getter('CrematorInfoRepository')
    protected crematorInfoRepositoryGetter: Getter<CrematorInfoRepository>,
    @repository.getter('MultipleCasketInfoRepository')
    protected multipleCasketInfoRepositoryGetter: Getter<MultipleCasketInfoRepository>
  ) {
    super(CremationWorkflowInfo, dataSource);
    this.multipleCasketInfo = this.createBelongsToAccessorFor(
      'multipleCasketInfo',
      multipleCasketInfoRepositoryGetter
    );
    this.registerInclusionResolver(
      'multipleCasketInfo',
      this.multipleCasketInfo.inclusionResolver
    );
    this.cremator = this.createBelongsToAccessorFor(
      'cremator',
      crematorInfoRepositoryGetter
    );
    this.registerInclusionResolver('cremator', this.cremator.inclusionResolver);
    this.agvInsertionChamber = this.createBelongsToAccessorFor(
      'agvInsertionChamber',
      agvStationRepositoryGetter
    );
    this.registerInclusionResolver(
      'agvInsertionChamber',
      this.agvInsertionChamber.inclusionResolver
    );
    this.agvTransferHall = this.createBelongsToAccessorFor(
      'agvTransferHall',
      agvStationRepositoryGetter
    );
    this.registerInclusionResolver(
      'agvTransferHall',
      this.agvTransferHall.inclusionResolver
    );
    this.agvServiceHall = this.createBelongsToAccessorFor(
      'agvServiceHall',
      agvStationRepositoryGetter
    );
    this.registerInclusionResolver(
      'agvServiceHall',
      this.agvServiceHall.inclusionResolver
    );
    this.serviceHall = this.createBelongsToAccessorFor(
      'serviceHall',
      serviceHallInfoRepositoryGetter
    );
    this.registerInclusionResolver(
      'serviceHall',
      this.serviceHall.inclusionResolver
    );
    this.oneIlsToPcms = this.createBelongsToAccessorFor(
      'oneIlsToPcms',
      oneIlsToPcmsRepositoryGetter
    );
    this.registerInclusionResolver(
      'oneIlsToPcms',
      this.oneIlsToPcms.inclusionResolver
    );
    this.hearth = this.createBelongsToAccessorFor(
      'hearth',
      hearthInfoRepositoryGetter
    );
    this.registerInclusionResolver('hearth', this.hearth.inclusionResolver);
    this.deceased = this.createBelongsToAccessorFor(
      'deceased',
      deceasedInfoRepositoryGetter
    );
    this.registerInclusionResolver('deceased', this.deceased.inclusionResolver);
  }
}
