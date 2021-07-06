import { belongsTo, Entity, model, property } from '@loopback/repository';
import { CollectionWorkflow } from './collection-workflow.model';
import { CremationWorkflow } from './cremation-workflow.model';
import { TvInfo } from './tv-info.model';

@model()
export class TvJob extends Entity {
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
  type?: string;

  @property({
    type: 'string',
  })
  errorCode?: string;

  @property({
    type: 'string',
  })
  errorDescription?: string;

  @belongsTo(() => TvInfo)
  tvId: number;

  @belongsTo(() => CremationWorkflow)
  cremationWorkflowId: number;

  @belongsTo(() => CollectionWorkflow)
  collectionWorkflowId: number;

  constructor(data?: Partial<TvJob>) {
    super(data);
  }
}

export interface TvJobRelations {
  // describe navigational properties here
}

export type TvJobWithRelations = TvJob & TvJobRelations;
