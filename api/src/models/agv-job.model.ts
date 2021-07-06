import { belongsTo, Entity, model, property } from '@loopback/repository';
import { AgvInfo } from './agv-info.model';
import { CollectionWorkflow } from './collection-workflow.model';
import { CremationWorkflow } from './cremation-workflow.model';

@model()
export class AgvJob extends Entity {
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
  ownerKey?: string;

  @property({
    type: 'string',
  })
  relateKey?: string;

  @property({
    type: 'string',
  })
  order?: string;

  @property({
    type: 'string',
  })
  orderDetail?: string;

  @property({
    type: 'string',
  })
  destination1?: string;

  @property({
    type: 'string',
  })
  height1?: string;

  @property({
    type: 'string',
  })
  destination2?: string;

  @property({
    type: 'string',
  })
  height2?: string;

  @property({
    type: 'string',
  })
  priority?: string;

  @property({
    type: 'string',
  })
  carrierNumber?: string;

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
  agvType?: string;

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

  @belongsTo(() => CremationWorkflow)
  cremationWorkflowId: number;

  @belongsTo(() => CollectionWorkflow)
  collectionWorkflowId: number;

  @belongsTo(() => AgvInfo)
  agvId: number;

  constructor(data?: Partial<AgvJob>) {
    super(data);
  }
}

export interface AgvJobRelations {
  // describe navigational properties here
}

export type AgvJobWithRelations = AgvJob & AgvJobRelations;
