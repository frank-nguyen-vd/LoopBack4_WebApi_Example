// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata,
  AuthorizationRequest,
  Authorizer,
} from '@loopback/authorization';
import { inject, Provider } from '@loopback/core';
import * as casbin from 'casbin';
import _ from 'lodash';
import { RESOURCE_ID } from '../../../keys';
import { RbacAction, RbacSubject, TokenType } from '../../keys';

// Class level authorizer
export class CasbinAuthorizationProvider implements Provider<Authorizer> {
  constructor(
    @inject('casbin.enforcer.factory')
    private enforcerFactory: (name: string) => Promise<casbin.Enforcer>
  ) {}

  /**
   * @return authenticateFn
   */
  value(): Authorizer {
    return this.authorize.bind(this);
  }

  async authorize(
    authorizationCtx: AuthorizationContext,
    metadata: AuthorizationMetadata
  ): Promise<AuthorizationDecision> {
    // Deny access if authorization details are missing
    if (authorizationCtx.principals.length < 1) {
      return AuthorizationDecision.DENY;
    }

    // Extract user id and role from the token key
    const tokenProfile = _.pick(authorizationCtx.principals[0], [
      'userRole',
      'tokenType',
      'tokenExpiry',
    ]);

    // Reject if token expires
    if (Date.now() > tokenProfile.tokenExpiry) {
      return AuthorizationDecision.DENY;
    }

    // If user role is None, deny access
    if (tokenProfile.userRole === RbacSubject.None)
      return AuthorizationDecision.DENY;

    // Retrieve the objectId from the API request
    // for example,
    //     [GET] /object/5  --->   objectId=object5
    const resourceId = await authorizationCtx.invocationContext.get(
      RESOURCE_ID,
      { optional: true }
    );
    const rbacObject =
      resourceId ?? metadata.resource ?? authorizationCtx.resource;
    const rbacSubject = tokenProfile.userRole;
    const rbacAction = metadata.scopes?.[0];

    // Deny undefined action
    if (!rbacAction) return AuthorizationDecision.DENY;

    // Token that was issued to reset pass can only be used to reset password
    if (tokenProfile.tokenType === TokenType.ResetPass) {
      if (rbacAction === RbacAction.ResetPass) {
        return AuthorizationDecision.ALLOW;
      } else {
        return AuthorizationDecision.DENY;
      }
    }

    // Only 'Log In' token type is used to perform the remaining actions
    if (tokenProfile.tokenType !== TokenType.LogIn) {
      return AuthorizationDecision.DENY;
    }

    // Administrator can do anything
    if (tokenProfile.userRole === RbacSubject.Admin) {
      return AuthorizationDecision.ALLOW;
    }

    let allow = false;

    const request: AuthorizationRequest = {
      subject: rbacSubject,
      object: rbacObject,
      action: rbacAction,
    };
    allow = await this.enforceByRole(request);

    if (allow) return AuthorizationDecision.ALLOW;
    else return AuthorizationDecision.DENY;
  }

  async enforceByRole(request: AuthorizationRequest): Promise<boolean> {
    // An optimization for ONLY searching among the allowed roles' policies

    const enforcer = await this.enforcerFactory(request.subject);
    // If policies for this role are defined
    if (enforcer) {
      const allowedByRole = await enforcer.enforce(
        request.subject,
        request.object,
        request.action
      );
      if (allowedByRole) {
        return true;
      }
    }

    return false;
  }
}
