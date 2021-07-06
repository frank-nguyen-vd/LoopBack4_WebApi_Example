import { Model, model, property } from '@loopback/repository';

@model()
export class NewPassword extends Model {
  @property({
    type: 'string',
    required: true,
  })
  password: string;

  constructor(data?: Partial<NewPassword>) {
    super(data);
  }
}

export interface NewPasswordRelations {
  // describe navigational properties here
}

export type NewPasswordWithRelations = NewPassword & NewPasswordRelations;
