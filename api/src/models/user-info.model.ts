import { belongsTo, Entity, model, property } from '@loopback/repository';
import { GroupInfo } from './group-info.model';
import { UserCredential } from './user-credential.model';

@model()
export class UserInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    default: 'Undefined',
  })
  status: string;

  @property({
    type: 'string',
    default: 'Undefined',
  })
  username: string;

  @property({
    type: 'string',
    default: 'Undefined',
  })
  staffId: string;

  @property({
    type: 'string',
    default: 'Undefined',
  })
  firstName: string;

  @property({
    type: 'string',
    default: 'Undefined',
  })
  lastName: string;

  @property({
    type: 'string',
    default: 'Undefined',
  })
  contactNumber: string;
  @belongsTo(() => UserCredential)
  userCredentialId: number;

  @belongsTo(() => GroupInfo)
  groupId: number;

  constructor(data?: Partial<UserInfo>) {
    super(data);
  }
}

export interface UserInfoRelations {
  // describe navigational properties here
}

export type UserInfoWithRelations = UserInfo & UserInfoRelations;
