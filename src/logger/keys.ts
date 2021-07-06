// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { BindingKey } from '@loopback/core';
import { LogFn, LogWriterFn, TimerFn } from './types';

/**
 * Binding keys used by this component.
 */
export namespace LOG_BINDINGS {
  export const APP_LOG_LEVEL = BindingKey.create<LOG_LEVEL>('log.level');
  export const TIMER = BindingKey.create<TimerFn>('log.timer');
  export const LOGGER = BindingKey.create<LogWriterFn>('log.logger');
  export const LOG_ACTION = BindingKey.create<LogFn>('log.action');
}

/**
 * The key used to store log-related metadata via decorators and reflection.
 */
export const LOG_METADATA_KEY = 'log.metadata';

/**
 * Enum to define the supported log levels
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export enum LOG_LEVEL {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  OFF,
}

// eslint-disable-next-line
export enum LOG_FORMAT {
  TO_CONSOLE,
  TO_CSV,
  USER_ACTIVITY,
}
