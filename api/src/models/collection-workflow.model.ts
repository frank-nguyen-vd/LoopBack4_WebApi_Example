import { belongsTo, Entity, model, property } from '@loopback/repository';
import { CollectionWorkflowInfo } from './collection-workflow-info.model';

@model()
export class CollectionWorkflow extends Entity {
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
    type: 'object',
    mssql: {
      dataType: 'varchar(max)',
    },
  })
  jobSteps?: object;

  @property({
    type: 'string',
  })
  currentStep?: string;

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

  @belongsTo(() => CollectionWorkflowInfo)
  workflowInfoId: number;

  constructor(data?: Partial<CollectionWorkflow>) {
    super(data);
  }
}

export interface CollectionWorkflowRelations {
  // describe navigational properties here
}

export type CollectionWorkflowWithRelations = CollectionWorkflow &
  CollectionWorkflowRelations;
