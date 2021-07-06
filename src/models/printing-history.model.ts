import { belongsTo, Entity, model, property } from '@loopback/repository';
import { PrinterInfo } from './printer-info.model';
import { PrinterJob } from './printer-job.model';
import { UserInfo } from './user-info.model';

@model()
export class PrintingHistory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'Date',
  })
  printedDateTime?: Date;

  @property({
    type: 'string',
  })
  printedBy?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'object',
    mssql: {
      dataType: 'varchar(max)',
    },
  })
  data?: object;

  @property({
    type: 'string',
  })
  documentName?: string;

  @belongsTo(() => PrinterJob)
  printerJobId: number;

  @belongsTo(() => PrinterInfo)
  printerId: number;

  @belongsTo(() => UserInfo)
  userId: number;

  constructor(data?: Partial<PrintingHistory>) {
    super(data);
  }
}

export interface PrintingHistoryRelations {
  // describe navigational properties here
}

export type PrintingHistoryWithRelations = PrintingHistory &
  PrintingHistoryRelations;
