import { belongsTo, Entity, model, property } from '@loopback/repository';
import { DeceasedInfo } from './deceased-info.model';

@model()
export class LockerInfo extends Entity {
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
    type: 'Date',
  })
  statusDateTime?: Date;

  @property({
    type: 'Date',
  })
  storeDateTime?: Date;

  @property({
    type: 'string',
  })
  lockerNumber?: string;

  @property({
    type: 'boolean',
  })
  isUsed?: boolean;

  @property({
    type: 'boolean',
  })
  isFrontDoorOpen?: boolean;

  @property({
    type: 'boolean',
  })
  isRearDoorOpen?: boolean;

  @belongsTo(() => DeceasedInfo)
  deceasedId: number;

  @property({
    type: 'string',
  })
  size?: string;

  @property({
    type: 'string',
  })
  facade?: string;

  constructor(data?: Partial<LockerInfo>) {
    super(data);
  }
}

export interface LockerInfoRelations {
  // describe navigational properties here
}

export type LockerInfoWithRelations = LockerInfo & LockerInfoRelations;
