import { Entity, model, property } from '@loopback/repository';

@model()
export class PrinterInfo extends Entity {
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
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
  })
  location?: string;

  @property({
    type: 'boolean',
  })
  isUsed?: boolean;

  @property({
    type: 'string',
  })
  ipAddress?: string;

  constructor(data?: Partial<PrinterInfo>) {
    super(data);
  }
}

export interface PrinterInfoRelations {
  // describe navigational properties here
}

export type PrinterInfoWithRelations = PrinterInfo & PrinterInfoRelations;
