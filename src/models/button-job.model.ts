import { belongsTo, Entity, model, property } from '@loopback/repository';
import { ButtonInfo } from './button-info.model';
import { CollectionWorkflow } from './collection-workflow.model';

@model()
export class ButtonJob extends Entity {
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

  @belongsTo(() => ButtonInfo)
  buttonId: number;

  @belongsTo(() => CollectionWorkflow)
  collectionWorkflowId: number;

  constructor(data?: Partial<ButtonJob>) {
    super(data);
  }
}

export interface ButtonJobRelations {
  // describe navigational properties here
}

export type ButtonJobWithRelations = ButtonJob & ButtonJobRelations;
