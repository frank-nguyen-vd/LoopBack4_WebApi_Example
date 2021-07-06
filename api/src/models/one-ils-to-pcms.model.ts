import { Entity, model, property } from '@loopback/repository';

@model()
export class OneIlsToPcms extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  deceasedName?: string;

  @property({
    type: 'string',
  })
  dateOfDeath?: string;

  @property({
    type: 'string',
  })
  deathCertNumber?: string;

  @property({
    type: 'string',
  })
  cremationPermitNumber?: string;

  @property({
    type: 'string',
  })
  deceasedReligion?: string;

  @property({
    type: 'number',
  })
  deceasedAge?: number;

  @property({
    type: 'string',
  })
  dateOfService?: string;

  @property({
    type: 'string',
  })
  timeOfService?: string;

  @property({
    type: 'string',
  })
  serviceHallNumber?: string;

  @property({
    type: 'string',
  })
  crematorNumber?: string;

  @property({
    type: 'boolean',
  })
  isSelfPicked?: boolean;

  @property({
    type: 'boolean',
  })
  isPulverized?: boolean;

  @property({
    type: 'string',
  })
  dateOfCollection?: string;

  @property({
    type: 'string',
  })
  timeOfCollection?: string;

  @property({
    type: 'string',
  })
  bookingStatus?: string;

  @property({
    type: 'string',
  })
  cremationRegistrationNumber?: string;

  @property({
    type: 'string',
  })
  causeOfDeath?: string;

  @property({
    type: 'string',
  })
  infectiousDisease?: string;

  @property({
    type: 'string',
  })
  cremationApplicationName?: string;

  constructor(data?: Partial<OneIlsToPcms>) {
    super(data);
  }
}

export interface OneIlsToPcmsRelations {
  // describe navigational properties here
}

export type OneIlsToPcmsWithRelations = OneIlsToPcms & OneIlsToPcmsRelations;
