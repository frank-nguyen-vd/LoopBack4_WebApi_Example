import { Entity, model, property } from '@loopback/repository';

@model()
export class UserCredential extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    default: undefined,
  })
  password: string;

  @property({
    type: 'string',
    default: undefined,
  })
  otpCode: string;

  @property({
    type: 'Date',
    default: undefined,
  })
  otpExpiry: Date;

  @property({
    type: 'number',
    default: 0,
  })
  otpSubmissions: number;

  @property({
    type: 'number',
    default: 0,
  })
  passwordSubmissions: number;

  @property({
    type: 'Date',
    default: undefined,
  })
  passwordExpiry: Date;

  constructor(data?: Partial<UserCredential>) {
    super(data);
  }
}

export interface UserCredentialRelations {
  // describe navigational properties here
}

export type UserCredentialWithRelations = UserCredential &
  UserCredentialRelations;
