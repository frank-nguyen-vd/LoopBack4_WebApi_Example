// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import * as casbin from 'casbin';
import path from 'path';
import { RbacSubject } from '../../keys';

const POLICY_PATHS = {
  mgmt: '../../../../rbac_policies/policy.mgmt.csv',
  sup: '../../../../rbac_policies/policy.sup.csv',
  op: '../../../../rbac_policies/policy.op.csv',
  service: '../../../../rbac_policies/policy.service.csv',
  user: '../../../../rbac_policies/policy.user.csv',
};

export async function getCasbinEnforcerByName(
  name: string
): Promise<casbin.Enforcer | undefined> {
  const CASBIN_ENFORCERS: { [key: string]: Promise<casbin.Enforcer> } = {
    [RbacSubject.Manager]: createEnforcerByRole(POLICY_PATHS.mgmt),
    [RbacSubject.Supervisor]: createEnforcerByRole(POLICY_PATHS.sup),
    [RbacSubject.Operator]: createEnforcerByRole(POLICY_PATHS.op),
    [RbacSubject.Service]: createEnforcerByRole(POLICY_PATHS.service),
    [RbacSubject.User]: createEnforcerByRole(POLICY_PATHS.user),
  };
  if (Object.prototype.hasOwnProperty.call(CASBIN_ENFORCERS, name)) {
    return CASBIN_ENFORCERS[name];
  }
  return undefined;
}

export async function createEnforcerByRole(
  policyPath: string
): Promise<casbin.Enforcer> {
  const conf = path.resolve(
    __dirname,
    '../../../../rbac_policies/rbac_model.conf'
  );
  const policy = path.resolve(__dirname, policyPath);
  return casbin.newEnforcer(conf, policy);
}
