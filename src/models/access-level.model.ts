import { Entity, model, property } from '@loopback/repository';

@model()
export class AccessLevel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  alias: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<AccessLevel>) {
    super(data);
  }
}

export interface AccessLevelRelations {
  // describe navigational properties here
}

export type AccessLevelWithRelations = AccessLevel & AccessLevelRelations;
