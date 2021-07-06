import { Entity, model, property } from '@loopback/repository';

@model()
export class RecipientInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  idNumber?: string;

  @property({
    type: 'string',
  })
  idType?: string;

  @property({
    type: 'string',
  })
  addressStreet?: string;

  @property({
    type: 'string',
  })
  addressCountry?: string;

  @property({
    type: 'string',
  })
  postalCode?: string;

  @property({
    type: 'string',
  })
  contactNumber?: string;

  @property({
    type: 'string',
  })
  gender?: string;

  @property({
    type: 'number',
  })
  age?: number;

  @property({
    type: 'string',
  })
  relationship?: string;

  @property({
    type: 'string',
  })
  managementCremains?: string;

  constructor(data?: Partial<RecipientInfo>) {
    super(data);
  }
}

export interface RecipientInfoRelations {
  // describe navigational properties here
}

export type RecipientInfoWithRelations = RecipientInfo & RecipientInfoRelations;
