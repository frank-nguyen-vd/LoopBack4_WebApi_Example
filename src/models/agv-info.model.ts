import { Entity, model, property } from '@loopback/repository';

@model()
export class AgvInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  carrierNumber: string;

  @property({
    type: 'string',
  })
  carrierState?: string;

  @property({
    type: 'string',
  })
  from?: string;

  @property({
    type: 'string',
  })
  to?: string;

  @property({
    type: 'string',
  })
  positionX?: string;

  @property({
    type: 'string',
  })
  positionY?: string;

  @property({
    type: 'string',
  })
  angle?: string;

  @property({
    type: 'string',
  })
  txState?: string;

  @property({
    type: 'string',
  })
  batteryLevel?: string;

  constructor(data?: Partial<AgvInfo>) {
    super(data);
  }
}

export interface AgvInfoRelations {
  // describe navigational properties here
}

export type AgvInfoWithRelations = AgvInfo & AgvInfoRelations;
