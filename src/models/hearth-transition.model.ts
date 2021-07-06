import { belongsTo, Entity, model, property } from '@loopback/repository';
import { AgvJob } from './agv-job.model';
import { HearthInfo } from './hearth-info.model';
import {AgvStation} from './agv-station.model';

@model()
export class HearthTransition extends Entity {
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
  completionDateTime?: Date;

  @belongsTo(() => HearthInfo)
  hearthId: number;

  @belongsTo(() => AgvJob)
  agvJobId: number;

  @belongsTo(() => AgvStation)
  destination1Id: number;

  @belongsTo(() => AgvStation)
  destination2Id: number;

  constructor(data?: Partial<HearthTransition>) {
    super(data);
  }
}

export interface HearthTransitionRelations {
  // describe navigational properties here
}

export type HearthTransitionWithRelations = HearthTransition &
  HearthTransitionRelations;
