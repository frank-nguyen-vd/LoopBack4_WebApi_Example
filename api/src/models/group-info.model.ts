import { belongsTo, Entity, model, property } from '@loopback/repository';
import { AccessLevel } from './access-level.model';

@model()
export class GroupInfo extends Entity {
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
  alias?: string;

  @property({
    type: 'number',
    default: 0,
  })
  numberOfMembers: number;

  @belongsTo(() => AccessLevel, { name: 'accessLevel' })
  accessLevelAlias: string;

  constructor(data?: Partial<GroupInfo>) {
    super(data);
  }
}

export interface GroupInfoRelations {
  // describe navigational properties here
}

export type GroupInfoWithRelations = GroupInfo & GroupInfoRelations;
