import { UserProfile } from '@loopback/security';

export enum RbacSubject {
  Admin = 'admin',
  Manager = 'mgmt',
  Supervisor = 'sup',
  Operator = 'op',
  Service = 'service',
  User = 'user',
  None = '',
}

export enum RbacObject {
  User = 'user',
  Deceased = 'deceased',
  Group = 'group',
  None = '',
}

export enum RbacAction {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  ResetPass = 'reset-pass',
  None = '',
}

export enum UserStatus {
  Pending = 'Pending', // This account is never logged in
  Inactive = 'Inactive', // This account is not logged in
  Active = 'Active', // This account is being used to call APIs
  Disabled = 'Disabled', // This account is disabled
}

export enum GroupStatus {
  Enabled = 'Enabled',
  Disabled = 'Disabled', // This account is disabled
}

export enum TokenType {
  LogIn,
  ResetPass,
}

export interface TokenProfile extends UserProfile {
  userId: number;
  userRole: string;
  tokenType: TokenType;
  tokenExpiry: Date;
}

export interface TokenParamsSchema {
  Code: TokenType;
  Expires_In_Minutes: number;
}

export const ROLES_REQUIRE_2FA: string[] = [RbacSubject.Admin];

export const RbacParams = {
  Token: {
    LogIn: { Code: TokenType.LogIn, Expires_In_Minutes: 30 },
    ResetPass: { Code: TokenType.ResetPass, Expires_In_Minutes: 3 },
  },

  Password: { Max_Submissions: 3, Expires_In_Days: 90 },

  Otp: { Max_Submissions: 3, Expires_In_Minutes: 3 },
};
