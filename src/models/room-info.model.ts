import { belongsTo, Entity, model, property } from '@loopback/repository';
import { HearthInfo } from './hearth-info.model';

@model()
export class RoomInfo extends Entity {
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
  roomNumber?: string;

  @property({
    type: 'string',
  })
  scenario?: string;

  @property({
    type: 'boolean',
  })
  isUsed?: boolean;

  @belongsTo(() => HearthInfo)
  hearthId: number;

  constructor(data?: Partial<RoomInfo>) {
    super(data);
  }
}

export interface RoomInfoRelations {
  // describe navigational properties here
}

export type RoomInfoWithRelations = RoomInfo & RoomInfoRelations;
