import { Model, model, property } from '@loopback/repository';

@model()
export class RbacPolicy extends Model {
  @property({
    type: 'string',
  })
  subject: string;

  @property({
    type: 'string',
  })
  object: string;

  @property({
    type: 'string',
  })
  action: string;

  constructor(data?: Partial<RbacPolicy>) {
    super(data);
  }
}

export interface RbacPolicyRelations {
  // describe navigational properties here
}

export type RbacPolicyWithRelations = RbacPolicy & RbacPolicyRelations;
