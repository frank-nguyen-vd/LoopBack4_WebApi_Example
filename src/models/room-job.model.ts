import { belongsTo, Entity, model, property } from '@loopback/repository';
import { CollectionWorkflow } from './collection-workflow.model';
import { LockerInfo } from './locker-info.model';
import { RoomInfo } from './room-info.model';

@model()
export class RoomJob extends Entity {
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
  errorCode?: string;

  @property({
    type: 'string',
  })
  errorDescription?: string;

  @belongsTo(() => CollectionWorkflow, { name: 'collectionWorkflow' })
  collectionWorkflowId: number;

  @belongsTo(() => RoomInfo, { name: 'room' })
  roomId: number;

  @belongsTo(() => LockerInfo, { name: 'lockerInfo' })
  lockerId: number;

  constructor(data?: Partial<RoomJob>) {
    super(data);
  }
}

export interface RoomJobRelations {
  // describe navigational properties here
}

export type RoomJobWithRelations = RoomJob & RoomJobRelations;
