import { belongsTo, Entity, model, property } from '@loopback/repository';
import { HearthInfo } from './hearth-info.model';
import { ServiceHallInfo } from './service-hall-info.model';

@model()
export class CrematorInfo extends Entity {
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
  crematorNumber?: string;

  @property({
    type: 'boolean',
  })
  isUsed?: boolean;

  @belongsTo(() => HearthInfo)
  hearthId: number;

  @property({
    type: 'object',
    mssql: {
      dataType: 'varchar(max)',
    },
  })
  agvRoutingPreset?: object;

  @belongsTo(() => ServiceHallInfo)
  serviceHallId: number;

  constructor(data?: Partial<CrematorInfo>) {
    super(data);
  }
}

export interface CrematorInfoRelations {
  // describe navigational properties here
}

export type CrematorInfoWithRelations = CrematorInfo & CrematorInfoRelations;
