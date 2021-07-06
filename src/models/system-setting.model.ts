import { Entity, model, property } from '@loopback/repository';

@model()
export class SystemSetting extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  inactiveUserDuration?: number;

  @property({
    type: 'number',
  })
  loginTimeout?: number;

  @property({
    type: 'number',
  })
  earlyComerTimeAllowed?: number;

  @property({
    type: 'number',
  })
  lateComerTimeAllowed?: number;

  @property({
    type: 'number',
  })
  transferJobTimeout?: number;

  @property({
    type: 'number',
  })
  agvJobTimeout?: number;

  @property({
    type: 'number',
  })
  scannerTimeout?: number;

  @property({
    type: 'number',
  })
  printerTimeout?: number;

  @property({
    type: 'number',
  })
  ashOverdueTimeout?: number;

  @property({
    type: 'number',
  })
  uncollectedHearthTimeout?: number;

  @property({
    type: 'number',
  })
  roomHinduSessionTimeout?: number;

  @property({
    type: 'number',
  })
  roomNonHinduSessionTimeout?: number;

  constructor(data?: Partial<SystemSetting>) {
    super(data);
  }
}

export interface SystemSettingRelations {
  // describe navigational properties here
}

export type SystemSettingWithRelations = SystemSetting & SystemSettingRelations;
