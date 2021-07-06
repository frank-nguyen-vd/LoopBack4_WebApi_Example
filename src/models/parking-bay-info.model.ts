import { belongsTo, Entity, model, property } from '@loopback/repository';
import { HearthInfo } from './hearth-info.model';

@model()
export class ParkingBayInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
  })
  level?: string;

  @property({
    type: 'string',
  })
  unitNumber?: string;

  @property({
    type: 'boolean',
  })
  isUsed?: boolean;

  @property({
    type: 'boolean',
  })
  isPriority?: boolean;

  @belongsTo(() => HearthInfo)
  hearthId: number;

  constructor(data?: Partial<ParkingBayInfo>) {
    super(data);
  }
}

export interface ParkingBayInfoRelations {
  // describe navigational properties here
}

export type ParkingBayInfoWithRelations = ParkingBayInfo &
  ParkingBayInfoRelations;
