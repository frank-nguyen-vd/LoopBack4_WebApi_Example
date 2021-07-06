import {Entity, model, property} from '@loopback/repository';

@model()
export class AgvJobResponse extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  createdDateTime?: string;

  @property({
    type: 'string',
  })
  dataId?: string;

  @property({
    type: 'string',
  })
  ownerKey?: string;

  @property({
    type: 'string',
  })
  dccId?: string;

  @property({
    type: 'string',
  })
  response?: string;

  @property({
    type: 'string',
  })
  errorCode?: string;

  @property({
    type: 'string',
  })
  orderState?: string;

  @property({
    type: 'string',
  })
  orderIndex?: string;

  @property({
    type: 'string',
  })
  carrierNo?: string;

  @property({
    type: 'string',
  })
  relateKey?: string;

  @property({
    type: 'string',
  })
  order?: string;

  @property({
    type: 'string',
  })
  orderDetail?: string;

  @property({
    type: 'string',
  })
  destination1?: string;

  @property({
    type: 'string',
  })
  height1?: string;

  @property({
    type: 'string',
  })
  destination2?: string;

  @property({
    type: 'string',
  })
  height2?: string;

  @property({
    type: 'string',
  })
  priority?: string;


  constructor(data?: Partial<AgvJobResponse>) {
    super(data);
  }
}

export interface AgvJobResponseRelations {
  // describe navigational properties here
}

export type AgvJobResponseWithRelations = AgvJobResponse & AgvJobResponseRelations;
