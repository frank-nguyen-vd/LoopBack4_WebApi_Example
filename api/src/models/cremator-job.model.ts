import { belongsTo, Entity, model, property } from '@loopback/repository';
import { CremationWorkflow } from './cremation-workflow.model';
import { CrematorInfo } from './cremator-info.model';

@model()
export class CrematorJob extends Entity {
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

  // reference: https://loopback.io/doc/en/lb4/BelongsTo-relation.html
  // relationship name is used in createBelongsToAccessorFor()
  @belongsTo(() => CrematorInfo, { name: 'crematorInfo' })
  crematorId: number;

  // reference: https://loopback.io/doc/en/lb4/BelongsTo-relation.html
  // relationship name is used in createBelongsToAccessorFor()
  @belongsTo(() => CremationWorkflow, { name: 'cremationWorkflow' })
  cremationWorkflowId: number;

  constructor(data?: Partial<CrematorJob>) {
    super(data);
  }
}

export interface CrematorJobRelations {
  // describe navigational properties here
}

export type CrematorJobWithRelations = CrematorJob & CrematorJobRelations;
