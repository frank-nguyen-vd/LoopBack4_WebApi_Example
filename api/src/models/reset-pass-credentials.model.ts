import { Model, model, property } from '@loopback/repository';

@model()
export class ResetPassCredentials extends Model {
  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  contactNumber: string;

  constructor(data?: Partial<ResetPassCredentials>) {
    super(data);
  }
}

export interface ResetPassCredentialsRelations {
  // describe navigational properties here
}

export type ResetPassCredentialsWithRelations = ResetPassCredentials &
  ResetPassCredentialsRelations;
