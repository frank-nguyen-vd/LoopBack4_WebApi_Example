import { belongsTo, Entity, model, property } from '@loopback/repository';
import { CollectionWorkflow } from './collection-workflow.model';
import { PrinterInfo } from './printer-info.model';
import { UserInfo } from './user-info.model';

@model()
export class PrinterJob extends Entity {
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
    type: 'boolean',
  })
  isBigLocker?: boolean;

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

  @belongsTo(() => UserInfo)
  userId: number;

  @belongsTo(() => PrinterInfo)
  printerId: number;

  @belongsTo(() => CollectionWorkflow)
  collectionWorkflowId: number;

  constructor(data?: Partial<PrinterJob>) {
    super(data);
  }
}

export interface PrinterJobRelations {
  // describe navigational properties here
}

export type PrinterJobWithRelations = PrinterJob & PrinterJobRelations;
