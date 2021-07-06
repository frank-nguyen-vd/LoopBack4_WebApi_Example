import { belongsTo, Entity, model, property } from '@loopback/repository';
import { CollectionWorkflow } from './collection-workflow.model';
import { RecipientInfo } from './recipient-info.model';
import { UserInfo } from './user-info.model';

@model()
export class SmsJob extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'Date',
  })
  createdDateTime?: Date;

  @property({
    type: 'Date',
  })
  statusDateTime?: Date;

  @property({
    type: 'Date',
  })
  completionDateTime?: Date;

  @property({
    type: 'string',
  })
  errorCode?: string;

  @property({
    type: 'string',
  })
  errorDescription?: string;

  @property({
    type: 'string',
  })
  remarks?: string;

  @belongsTo(() => UserInfo)
  userId: number;

  @belongsTo(() => RecipientInfo)
  recipientId: number;

  @belongsTo(() => CollectionWorkflow)
  collectionWorkflowId: number;

  constructor(data?: Partial<SmsJob>) {
    super(data);
  }
}

export interface SmsJobRelations {
  // describe navigational properties here
}

export type SmsJobWithRelations = SmsJob & SmsJobRelations;
