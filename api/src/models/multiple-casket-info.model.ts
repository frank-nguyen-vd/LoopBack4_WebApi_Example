import { Entity, model, property, belongsTo } from '@loopback/repository';
import { ServiceHallInfo } from './service-hall-info.model';

@model()
export class MultipleCasketInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  timeOfService?: string;

  @property({
    type: 'string',
  })
  dateOfService?: string;

  @belongsTo(() => ServiceHallInfo)
  serviceHallId: number;

  constructor(data?: Partial<MultipleCasketInfo>) {
    super(data);
  }
}

export interface MultipleCasketInfoRelations {
  // describe navigational properties here
}

export type MultipleCasketInfoWithRelations = MultipleCasketInfo &
  MultipleCasketInfoRelations;
