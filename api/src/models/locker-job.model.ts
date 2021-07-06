import { belongsTo, Entity, model, property } from '@loopback/repository';
import { CollectionWorkflow } from './collection-workflow.model';
import { LockerInfo } from './locker-info.model';
import { UserInfo } from './user-info.model';

@model()
export class LockerJob extends Entity {
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
  queueNumber?: string;

  @property({
    type: 'string',
  })
  side?: string;

  @property({
    type: 'string',
  })
  createdBy?: string;

  @property({
    type: 'string',
  })
  updatedBy?: string;

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

  @belongsTo(() => CollectionWorkflow)
  collectionWorkflowId: number;

  @belongsTo(() => LockerInfo)
  lockerId: number;

  @belongsTo(() => UserInfo)
  userId: number;

  constructor(data?: Partial<LockerJob>) {
    super(data);
  }
}

export interface LockerJobRelations {
  // describe navigational properties here
}

export type LockerJobWithRelations = LockerJob & LockerJobRelations;
