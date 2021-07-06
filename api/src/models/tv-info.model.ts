import { Entity, model, property } from '@loopback/repository';

@model()
export class TvInfo extends Entity {
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
  code?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  location?: string;

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
  ipAddress?: string;

  @property({
    type: 'string',
  })
  type?: string;

  constructor(data?: Partial<TvInfo>) {
    super(data);
  }
}

export interface TvInfoRelations {
  // describe navigational properties here
}

export type TvInfoWithRelations = TvInfo & TvInfoRelations;
