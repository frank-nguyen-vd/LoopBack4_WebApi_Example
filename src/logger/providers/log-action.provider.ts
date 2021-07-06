// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  Constructor,
  CoreBindings,
  Getter,
  inject,
  Provider,
} from '@loopback/core';
import { repository } from '@loopback/repository';
import { OperationArgs, Request } from '@loopback/rest';
import chalk from 'chalk';
import { MyUserService, UserServiceBindings } from '../../rbac';
import { UserInfoRepository } from '../../repositories';
import { getLogMetadata } from '../decorators';
import { LOG_BINDINGS, LOG_FORMAT, LOG_LEVEL } from '../keys';
import { LevelMetadata, LogFn, LogWriterFn } from '../types';

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriterServer = createCsvWriter({
  path: 'logs/server_log.csv',
  append: true,
  header: [
    { id: 'timestamp', title: 'Timestamp' },
    { id: 'type', title: 'Type' },
    { id: 'content', title: 'Content' },
  ],
});

const csvWriterUserActivity = createCsvWriter({
  path: 'logs/user_activity_log.csv',
  append: true,
  header: [
    { id: 'username', title: 'Username' },
    { id: 'firstName', title: 'First Name' },
    { id: 'lastName', title: 'Last Name' },
    { id: 'activity', title: 'Activity' },
    { id: 'role', title: 'Department' },
    { id: 'timestamp', title: 'Timestamp' },
  ],
});

const unknown = 'unknown';

export class LogActionProvider implements Provider<LogFn> {
  // LogWriteFn is an optional dependency and it falls back to `logToConsole`
  @inject(LOG_BINDINGS.LOGGER, { optional: true })
  toConsole: LogWriterFn = logToConsole;

  @inject(LOG_BINDINGS.LOGGER, { optional: true })
  toCsv: LogWriterFn = logToCsv;

  @inject(LOG_BINDINGS.APP_LOG_LEVEL, { optional: true })
  logLevel: LOG_LEVEL = LOG_LEVEL.WARN;

  constructor(
    @inject.getter(CoreBindings.CONTROLLER_CLASS)
    private readonly getController: Getter<Constructor<{}>>,
    @inject.getter(CoreBindings.CONTROLLER_METHOD_NAME)
    private readonly getMethod: Getter<string>,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @repository(UserInfoRepository)
    public userRepository: UserInfoRepository
  ) {}

  value(): LogFn {
    const fn = <LogFn>((
      req: Request,
      args: OperationArgs,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result: any
    ) => {
      return this.action(req, args, result);
    });

    return fn;
  }

  private async action(
    req: Request,
    args: OperationArgs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: any
  ): Promise<void> {
    const controllerClass = await this.getController();
    const methodName: string = await this.getMethod();

    const metadata: LevelMetadata = getLogMetadata(controllerClass, methodName);
    const level: number | undefined = metadata ? metadata.level : undefined;
    const format: number | undefined = metadata ? metadata.format : undefined;

    if (
      level !== undefined &&
      this.logLevel !== LOG_LEVEL.OFF &&
      level !== LOG_LEVEL.OFF &&
      level >= this.logLevel
    ) {
      if (!args) args = [];
      let msg = `${req.url} :: ${controllerClass.name}.`;
      msg += `${methodName}(${args.join(', ')}) => `;

      if (typeof result === 'object') msg += JSON.stringify(result);
      else msg += result;

      this.toConsole(msg, level);
      if (format === LOG_FORMAT.TO_CONSOLE) return;

      this.toCsv(msg, level);
      if (format === LOG_FORMAT.TO_CSV) return;

      if (format === LOG_FORMAT.USER_ACTIVITY) {
        const username = args.length > 0 ? args[0].username : unknown;
        await this.logUserActivity(username, result.message);
      }
    }
  }

  async logUserActivity(username: string, activity: string) {
    const userInfo = await this.userService.getUserInfoByKey(
      'username',
      username
    );
    const userRole = await this.userService.getUserRole(userInfo.id);

    csvWriterUserActivity.writeRecords([
      {
        username: username,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userRole,
        activity: activity,
        timestamp: new Date().toString(),
      },
    ]);
  }
}

function logToConsole(msg: string, level: number) {
  let output;
  switch (level) {
    case LOG_LEVEL.DEBUG:
      output = chalk.white(`${Date.now()} DEBUG: ${msg}`);
      break;
    case LOG_LEVEL.INFO:
      output = chalk.green(`${Date.now()} INFO: ${msg}`);
      break;
    case LOG_LEVEL.WARN:
      output = chalk.yellow(`${Date.now()} WARN: ${msg}`);
      break;
    case LOG_LEVEL.ERROR:
      output = chalk.red(`${Date.now()} ERROR: ${msg}`);
      break;
  }
  if (output) console.log(output);
}

function logToCsv(msg: string, level: number) {
  const msgTimestamp = Date.now();
  let msgType;
  const msgContent = msg;

  switch (level) {
    case LOG_LEVEL.DEBUG:
      msgType = 'DEBUG';
      break;
    case LOG_LEVEL.INFO:
      msgType = 'INFO';
      break;
    case LOG_LEVEL.WARN:
      msgType = 'WARN';
      break;
    case LOG_LEVEL.ERROR:
      msgType = 'ERROR';
      break;
  }
  csvWriterServer.writeRecords([
    {
      timestamp: msgTimestamp,
      type: msgType,
      content: msgContent,
    },
  ]);
}
