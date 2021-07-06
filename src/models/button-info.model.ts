import { Entity, model, property } from '@loopback/repository';

@model()
export class ButtonInfo extends Entity {
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
    type: 'boolean',
  })
  isUsed?: boolean;

  @property({
    type: 'string',
  })
  ipAddress?: string;

  @property({
    type: 'string',
  })
  bitAddress?: string;

  constructor(data?: Partial<ButtonInfo>) {
    super(data);
  }
}

export interface ButtonInfoRelations {
  // describe navigational properties here
}

export type ButtonInfoWithRelations = ButtonInfo & ButtonInfoRelations;
