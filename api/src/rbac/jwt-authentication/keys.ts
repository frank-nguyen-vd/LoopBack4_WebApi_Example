// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { UserService } from '@loopback/authentication';
import { BindingKey } from '@loopback/core';
import { JWTService } from '.';
import { Credentials, UserInfo } from '../../models';

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'myjwts3cr3t';
  export const TOKEN_EXPIRES_IN_VALUE = '21600'; // expires in seconds, i.e. 21600s = 6 h
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret'
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds'
  );
  export const TOKEN_SERVICE = BindingKey.create<JWTService>(
    'services.authentication.jwt.tokenservice'
  );
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<
    UserService<UserInfo, Credentials>
  >('services.user.service');
}
