import { belongsTo, Entity, model, property } from '@loopback/repository';
import { CollectionWorkflow } from './collection-workflow.model';
import { CremationWorkflow } from './cremation-workflow.model';
import { EPaperInfo } from './e-paper-info.model';

@model()
export class EPaperJob extends Entity {
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

  @belongsTo(() => EPaperInfo)
  ePaperId: number;

  @belongsTo(() => CremationWorkflow)
  cremationWorkflowId: number;

  @belongsTo(() => CollectionWorkflow)
  collectionWorkflowId: number;

  constructor(data?: Partial<EPaperJob>) {
    super(data);
  }
}

export interface EPaperJobRelations {
  // describe navigational properties here
}

export type EPaperJobWithRelations = EPaperJob & EPaperJobRelations;
