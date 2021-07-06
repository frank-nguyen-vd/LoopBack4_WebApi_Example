import { belongsTo, Entity, model, property } from '@loopback/repository';
import { DeceasedInfo } from './deceased-info.model';

@model()
export class HearthInfo extends Entity {
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
  location?: string;

  @property({
    type: 'boolean',
  })
  isUsed?: boolean;

  @belongsTo(() => DeceasedInfo)
  deceasedId: number;

  constructor(data?: Partial<HearthInfo>) {
    super(data);
  }
}

export interface HearthInfoRelations {
  // describe navigational properties here
}

export type HearthInfoWithRelations = HearthInfo & HearthInfoRelations;
