import { Entity, model, property } from '@loopback/repository';

@model()
export class AgvStation extends Entity {
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
  location?: string;

  @property({
    type: 'string',
  })
  stationName?: string;

  @property({
    type: 'string',
  })
  stationNumber?: string;

  @property({
    type: 'string',
  })
  agvType?: string;

  constructor(data?: Partial<AgvStation>) {
    super(data);
  }
}

export interface AgvStationRelations {
  // describe navigational properties here
}

export type AgvStationWithRelations = AgvStation & AgvStationRelations;
