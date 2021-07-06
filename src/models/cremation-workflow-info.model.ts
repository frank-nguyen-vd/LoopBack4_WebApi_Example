import { belongsTo, Entity, model, property } from '@loopback/repository';
import { AgvStation } from './agv-station.model';
import { CrematorInfo } from './cremator-info.model';
import { DeceasedInfo } from './deceased-info.model';
import { HearthInfo } from './hearth-info.model';
import { OneIlsToPcms } from './one-ils-to-pcms.model';
import { ServiceHallInfo } from './service-hall-info.model';
import { MultipleCasketInfo } from './multiple-casket-info.model';

@model()
export class CremationWorkflowInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  dateOfService?: string;

  @property({
    type: 'string',
  })
  timeOfService?: string;

  @property({
    type: 'string',
  })
  bookingStatus?: string;

  @property({
    type: 'number',
  })
  serviceDuration?: number;

  @belongsTo(() => DeceasedInfo)
  deceasedId: number;

  @belongsTo(() => HearthInfo, { name: 'hearth' })
  hearthCremainId: number;

  @belongsTo(() => OneIlsToPcms)
  oneIlsToPcmsId: number;

  @belongsTo(() => ServiceHallInfo)
  serviceHallId: number;

  @belongsTo(() => AgvStation, { name: 'agvServiceHall' })
  agvServiceHallStn: number;

  @belongsTo(() => AgvStation, { name: 'agvTransferHall' })
  agvTransferHallStn: number;

  @belongsTo(() => AgvStation, { name: 'agvInsertionChamber' })
  agvInsertionChamberStn: number;

  @belongsTo(() => CrematorInfo)
  crematorId: number;

  @belongsTo(() => MultipleCasketInfo)
  multipleCasketInfoId: number;

  constructor(data?: Partial<CremationWorkflowInfo>) {
    super(data);
  }
}

export interface CremationWorkflowInfoRelations {
  // describe navigational properties here
}

export type CremationWorkflowInfoWithRelations = CremationWorkflowInfo &
  CremationWorkflowInfoRelations;
