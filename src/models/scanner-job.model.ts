import { belongsTo, Entity, model, property } from '@loopback/repository';
import { CollectionWorkflow } from './collection-workflow.model';
import { CremationWorkflow } from './cremation-workflow.model';
import { ScannerInfo } from './scanner-info.model';
import { UserInfo } from './user-info.model';

@model()
export class ScannerJob extends Entity {
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
  scannerValue?: string;

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

  @belongsTo(() => CremationWorkflow)
  cremationWorkflowId: number;

  @belongsTo(() => CollectionWorkflow)
  collectionWorkflowId: number;

  @belongsTo(() => ScannerInfo)
  scannerId: number;

  @belongsTo(() => UserInfo)
  userId: number;

  constructor(data?: Partial<ScannerJob>) {
    super(data);
  }
}

export interface ScannerJobRelations {
  // describe navigational properties here
}

export type ScannerJobWithRelations = ScannerJob & ScannerJobRelations;
