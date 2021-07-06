import { Model, model, property } from '@loopback/repository';

@model()
export class OtpCredential extends Model {
  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  otpCode: string;

  constructor(data?: Partial<OtpCredential>) {
    super(data);
  }
}

export interface OtpCredentialRelations {
  // describe navigational properties here
}

export type OtpCredentialWithRelations = OtpCredential & OtpCredentialRelations;
