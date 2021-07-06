import { belongsTo, Entity, model, property } from '@loopback/repository';
import { UserInfo } from './user-info.model';

@model()
export class ReportInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
  })
  documentName?: string;

  @property({
    type: 'string',
  })
  period?: string;

  @property({
    type: 'Date',
  })
  createdDate?: Date;

  @property({
    type: 'string',
  })
  path?: string;

  @belongsTo(() => UserInfo, {name: 'user'})
  userInfoId: number;

  constructor(data?: Partial<ReportInfo>) {
    super(data);
  }
}

export interface ReportInfoRelations {
  // describe navigational properties here
}

export type ReportInfoWithRelations = ReportInfo & ReportInfoRelations;
