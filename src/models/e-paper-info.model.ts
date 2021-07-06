import { Entity, model, property } from '@loopback/repository';

@model()
export class EPaperInfo extends Entity {
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

  constructor(data?: Partial<EPaperInfo>) {
    super(data);
  }
}

export interface EPaperInfoRelations {
  // describe navigational properties here
}

export type EPaperInfoWithRelations = EPaperInfo & EPaperInfoRelations;
