import { Model, model, property } from '@loopback/repository';

@model()
export class AccessLevelRelation extends Model {
  @property({
    type: 'string',
  })
  upperLevel: string;

  @property({
    type: 'string',
    required: true,
  })
  lowerLevel: string;

  constructor(data?: Partial<AccessLevelRelation>) {
    super(data);
  }
}

export interface AccessLevelRelationRelations {
  // describe navigational properties here
}

export type AccessLevelRelationWithRelations = AccessLevelRelation &
  AccessLevelRelationRelations;
