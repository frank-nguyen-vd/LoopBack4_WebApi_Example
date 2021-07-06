import { belongsTo, Entity, model, property } from '@loopback/repository';
import { ScannerInfo } from './scanner-info.model';
import { TvInfo } from './tv-info.model';

@model()
export class ServiceHallInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @belongsTo(() => TvInfo)
  tvId: number;

  @property({
    type: 'string',
  })
  startTime?: string;

  @property({
    type: 'number',
  })
  morningDuration?: number;

  @property({
    type: 'number',
  })
  afternoonDuration?: number;

  @belongsTo(() => ScannerInfo)
  hearseScannerId: number;

  constructor(data?: Partial<ServiceHallInfo>) {
    super(data);
  }
}

export interface ServiceHallInfoRelations {
  // describe navigational properties here
}

export type ServiceHallInfoWithRelations = ServiceHallInfo &
  ServiceHallInfoRelations;
