import { belongsTo, Entity, model, property } from '@loopback/repository';
import { DeceasedInfo } from './deceased-info.model';
import { HearthInfo } from './hearth-info.model';
import { LockerInfo } from './locker-info.model';
import { OneIlsToPcms } from './one-ils-to-pcms.model';
import { RecipientInfo } from './recipient-info.model';
import { RoomInfo } from './room-info.model';

@model()
export class CollectionWorkflowInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'number',
  })
  scenario?: number;

  @property({
    type: 'string',
  })
  crematorNumber?: string;
  @property({
    type: 'boolean',
  })
  pulverization?: boolean;

  @property({
    type: 'string',
  })
  qrCode?: string;

  @property({
    type: 'string',
  })
  dateOfCollection?: string;

  @property({
    type: 'string',
  })
  timeOfCollection?: string;

  @property({
    type: 'boolean',
  })
  isRoomNeeded?: boolean;

  @property({
    type: 'string',
  })
  bookingStatus?: string;
  @belongsTo(() => HearthInfo, { name: 'hearthCremain' })
  hearthCremainId: number;

  @belongsTo(() => HearthInfo, { name: 'hearthEmpty1' })
  hearthEmpty1Id: number;

  @belongsTo(() => HearthInfo, { name: 'hearthEmpty2' })
  hearthEmpty2Id: number;

  @belongsTo(() => DeceasedInfo)
  deceasedId: number;

  @belongsTo(() => OneIlsToPcms, { name: 'oneIls' })
  oneIlsToPcmsId: number;

  @belongsTo(() => RoomInfo)
  roomId: number;

  @belongsTo(() => LockerInfo)
  lockerId: number;

  @belongsTo(() => RecipientInfo)
  recipientId: number;

  constructor(data?: Partial<CollectionWorkflowInfo>) {
    super(data);
  }
}

export interface CollectionWorkflowInfoRelations {
  // describe navigational properties here
}

export type CollectionWorkflowInfoWithRelations = CollectionWorkflowInfo &
  CollectionWorkflowInfoRelations;
