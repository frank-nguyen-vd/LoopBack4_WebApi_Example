import { belongsTo, Entity, model, property } from '@loopback/repository';
import { OneIlsToPcms } from './one-ils-to-pcms.model';
import { RecipientInfo } from './recipient-info.model';

@model()
export class DeceasedInfo extends Entity {
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
  displayName?: string;

  @property({
    type: 'string',
  })
  dateOfDeath?: string;

  @property({
    type: 'string',
  })
  deathCertNumber?: string;

  @property({
    type: 'Date',
  })
  cremationDateTime?: Date;

  @property({
    type: 'string',
  })
  cremationPermitNumber?: string;

  @property({
    type: 'string',
  })
  cremationApplicationName?: string;

  @property({
    type: 'string',
  })
  religion?: string;

  @property({
    type: 'number',
  })
  age?: number;

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
  caseNumber?: string;

  @property({
    type: 'string',
  })
  caseType?: string;

  @property({
    type: 'string',
  })
  remark?: string;

  @property({
    type: 'boolean',
  })
  isSmallCasket?: boolean;

  @property({
    type: 'string',
  })
  scenario?: string;

  @belongsTo(() => OneIlsToPcms)
  oneIlsToPcmsId: number;

  @belongsTo(() => RecipientInfo)
  recipientInfoId: number;

  constructor(data?: Partial<DeceasedInfo>) {
    super(data);
  }
}

export interface DeceasedInfoRelations {
  // describe navigational properties here
}

export type DeceasedInfoWithRelations = DeceasedInfo & DeceasedInfoRelations;
