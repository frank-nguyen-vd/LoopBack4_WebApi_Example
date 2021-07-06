import { belongsTo, Entity, model, property } from '@loopback/repository';
import { CremationWorkflowInfo } from './cremation-workflow-info.model';

@model()
export class CremationWorkflow extends Entity {
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

  @belongsTo(() => CremationWorkflowInfo)
  workflowInfoId: number;

  constructor(data?: Partial<CremationWorkflow>) {
    super(data);
  }
}

export interface CremationWorkflowRelations {
  // describe navigational properties here
}

export type CremationWorkflowWithRelations = CremationWorkflow &
  CremationWorkflowRelations;
