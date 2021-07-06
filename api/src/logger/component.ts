// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Component, ProviderMap } from '@loopback/core';
import { LOG_BINDINGS } from './keys';
import { LogActionProvider, TimerProvider } from './providers';

export class LogComponent implements Component {
  providers?: ProviderMap = {
    [LOG_BINDINGS.TIMER.key]: TimerProvider,
    [LOG_BINDINGS.LOG_ACTION.key]: LogActionProvider,
  };
}
