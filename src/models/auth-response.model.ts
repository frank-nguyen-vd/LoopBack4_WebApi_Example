import { Model, model, property } from '@loopback/repository';

@model()
export class AuthResponse extends Model {
  @property({
    type: 'string',
  })
  message?: string;

  @property({
    type: 'string',
    required: true,
  })
  token?: string;

  @property({
    type: 'date',
    required: true,
  })
  passwordExpiry?: Date;

  constructor(data?: Partial<AuthResponse>) {
    super(data);
  }
}

export interface AuthResponseRelations {
  // describe navigational properties here
}

export type AuthResponseWithRelations = AuthResponse & AuthResponseRelations;
