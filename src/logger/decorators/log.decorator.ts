// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { LOG_LEVEL, LOG_FORMAT, LOG_METADATA_KEY } from '../keys';
import {
  Constructor,
  MethodDecoratorFactory,
  MetadataInspector,
} from '@loopback/core';
import { LevelMetadata } from '../types';

/**
 * Mark a controller method as requiring logging (input, output & timing)
 * if it is set at or greater than Application LogLevel.
 * LOG_LEVEL.DEBUG < LOG_LEVEL.INFO < LOG_LEVEL.WARN < LOG_LEVEL.ERROR < LOG_LEVEL.OFF
 *
 * @param level - The Log Level at or above it should log
 */
export function log(level?: number, format?: number) {
  if (level === undefined) level = LOG_LEVEL.WARN;
  if (format === undefined) format = LOG_FORMAT.TO_CONSOLE;
  return MethodDecoratorFactory.createDecorator<LevelMetadata>(
    LOG_METADATA_KEY,
    {
      level: level,
      format: format,
    }
  );
}

/**
 * Fetch log level stored by `@log` decorator.
 *
 * @param controllerClass - Target controller
 * @param methodName - Target method
 */
export function getLogMetadata(
  controllerClass: Constructor<{}>,
  methodName: string
): LevelMetadata {
  return (
    MetadataInspector.getMethodMetadata<LevelMetadata>(
      LOG_METADATA_KEY,
      controllerClass.prototype,
      methodName
    ) ?? { level: LOG_LEVEL.OFF, format: LOG_FORMAT.TO_CONSOLE }
  );
}
