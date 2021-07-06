// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { BindingKey } from '@loopback/core';
import { FileUploadHandler } from './types';

export const RESOURCE_ID = BindingKey.create<string>('resourceId');

/**
 * Binding key for the file upload service
 */
export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadHandler>(
  'services.FileUpload',
);

/**
 * Binding key for the storage directory
 */
export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');

export const MESSAGE = {
  MISC: {
    NO_PARAMS: 'No parameter is passed to the function',
  },
  RBAC: {
    FAILS_TO_REMOVE_LOWER_LEVEL: 'Fails to remove the lower access-level',
    FAILS_TO_REMOVE_ACCESS_LEVEL: 'Fails to remove the access-level',
    POLICY_EXISTS: 'This policy exists',
    FAILS_TO_ADD_POLICY: 'Fails to add policy',
    POLICY_NOT_EXISTS: 'Policy does not exist',
    FAILS_TO_REMOVE_POLICY: 'Fails to remove policy',
    ACCESS_LEVEL_NOT_EXISTS: 'Requested access level does not exists',
    ACCESS_LEVEL_EXISTS: 'Requested access level exists',
  },
  TOKEN: {
    INVALID: 'Invalid token',
  },
  USER: {
    EXISTS: 'This user exists',
    INVALID_CONTACT: 'Staff ID and contact number are incorrect',
    INVALID_CREDENTIAL: 'Staff ID and password are incorrect',
    DISABLED: 'This user is disabled',
    NOT_EXISTS: 'This user does not exist',
    UNDEFINED_ROLE: 'This user has undefined role',
  },
  OTP: {
    REQUIRED: 'OTP verification is required',
    EXPIRES: 'OTP code expires',
    INVALID: 'OTP code is invalid',
    LOGIN_FIRST: 'Log in with staff ID and password first',
    REQUEST_RST_PW_FIRST: 'Send reset password request first',
  },
  PASSWORD: {
    EXPIRES: 'Password expires',
    EXCEED_TRIES: 'Exceeds number of password submissions',
    CHANGED: 'Password is changed',
  },
  GROUP: {
    EXISTS: 'This group exists',
    NOT_EXISTS: 'This group does not exist',
  },
  EPAPER: {
    EXISTS: 'This e-paper exists',
    NOT_EXISTS: 'This e-paper does not exist',
  },
  CREMATOR_INFO: {
    EXISTS: 'This cremator info exists',
    NOT_EXISTS: 'This cremator info does not exist',
  },

  CREMATION_WORKFLOW: {
    EXISTS: 'This cremation workflow exists',
    NOT_EXISTS: 'This cremator workflow does not exist',
  },

  CREMATOR_JOB: {
    EXISTS: 'This cremator job exists',
    NOT_EXISTS: 'This cremator job does not exist',
  },

  EPAPER_JOB: {
    EXISTS: 'This e-paper job exists',
    NOT_EXISTS: 'This e-paper job does not exist',
  },

  OneILS: {
    EXISTS: 'This record exists',
    NOT_EXISTS: 'This record does not exist',
  },

  HEARTH: {
    EXISTS: 'This hearth exists',
    NOT_EXISTS: 'This hearth does not exist',
  },

  PRINTER: {
    EXISTS: 'This printer exists',
    NOT_EXISTS: 'This printer does not exist',
  },

  PRINTER_JOB: {
    EXISTS: 'This printer job exists',
    NOT_EXISTS: 'This printer job does not exist',
  },

  SCANNER: {
    EXISTS: 'This scanner exists',
    NOT_EXISTS: 'This scanner does not exist',
  },

  SCANNER_JOB: {
    EXISTS: 'This scanner job exists',
    NOT_EXISTS: 'This scanner job does not exist',
  },

  DECEASED: {
    EXISTS: 'This deceased exists',
    NOT_EXISTS: 'This deceased does not exist',
  },

  LOCKER: {
    EXISTS: 'This locker exists',
    NOT_EXISTS: 'This locker does not exist',
  },

  PARKING_BAY: {
    EXISTS: 'This parking bay exists',
    NOT_EXISTS: 'This parking bay does not exist',
  },

  RECIPIENT: {
    EXISTS: 'This recipient exists',
    NOT_EXISTS: 'This recipient does not exist',
  },

  ROOM: {
    EXISTS: 'This room exists',
    NOT_EXISTS: 'This room does not exist',
  },

  AGV_STATION: {
    EXISTS: 'This agv station exists',
    NOT_EXISTS: 'This agv station does not exist',
  },

  TV_INFO: {
    EXISTS: 'This tv info exists',
    NOT_EXISTS: 'This tv info does not exist',
  },
};
