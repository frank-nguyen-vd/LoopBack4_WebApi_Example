import { Entity, model, property } from '@loopback/repository';

@model()
export class HandheldScannerInfo extends Entity {
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
  ipAddress?: string;

  @property({
    type: 'number',
  })
  batteryLevel?: number;

  constructor(data?: Partial<HandheldScannerInfo>) {
    super(data);
  }
}

export interface HandheldScannerInfoRelations {
  // describe navigational properties here
}

export type HandheldScannerInfoWithRelations = HandheldScannerInfo &
  HandheldScannerInfoRelations;
