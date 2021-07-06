import { Entity, model, property } from '@loopback/repository';

@model()
export class ScannerInfo extends Entity {
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
  type?: string;

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

  constructor(data?: Partial<ScannerInfo>) {
    super(data);
  }
}

export interface ScannerInfoRelations {
  // describe navigational properties here
}

export type ScannerInfoWithRelations = ScannerInfo & ScannerInfoRelations;
