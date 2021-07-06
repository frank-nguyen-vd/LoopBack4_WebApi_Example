import { Entity, model, property } from '@loopback/repository';

@model()
export class AlertJob extends Entity {
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
  module?: string;

  @property({
    type: 'number',
  })
  moduleId?: number;

  @property({
    type: 'string',
  })
  category?: string;

  @property({
    type: 'string',
  })
  alertType?: string;

  @property({
    type: 'boolean',
  })
  isEnabled?: boolean;

  @property({
    type: 'number',
  })
  muteDuration?: number;

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

  constructor(data?: Partial<AlertJob>) {
    super(data);
  }
}

export interface AlertJobRelations {
  // describe navigational properties here
}

export type AlertJobWithRelations = AlertJob & AlertJobRelations;
