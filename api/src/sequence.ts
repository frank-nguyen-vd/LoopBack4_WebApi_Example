import {
  AuthenticateFn,
  AuthenticationBindings,
  AUTHENTICATION_STRATEGY_NOT_FOUND,
  USER_PROFILE_NOT_FOUND,
} from '@loopback/authentication';
import { Context, inject } from '@loopback/core';
import {
  FindRoute,
  InvokeMethod,
  InvokeMiddleware,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import { LOG_BINDINGS, LogFn } from './logger';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  /**
   * Optional invoker for registered middleware in a chain.
   * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
   */
  @inject(SequenceActions.INVOKE_MIDDLEWARE, { optional: true })
  protected invokeMiddleware: InvokeMiddleware = () => false;

  constructor(
    @inject(RestBindings.Http.CONTEXT) public ctx: Context,
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,
    @inject(LOG_BINDINGS.LOG_ACTION) protected logger: LogFn
  ) {}

  async handle(context: RequestContext) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let logRequest: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let logArgs: any = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let logResult: any;
    try {
      const { request, response } = context;
      logRequest = request;
      const finished = await this.invokeMiddleware(context);
      if (finished) return;
      const route = this.findRoute(request);
      // call authentication action
      await this.authenticateRequest(request);
      const args = await this.parseParams(request, route);
      logArgs = args;
      const result = await this.invoke(route, args);
      logResult = result;
      this.send(response, result);
    } catch (error) {
      logResult = error;
      if (
        error.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
        error.code === USER_PROFILE_NOT_FOUND
      ) {
        Object.assign(error, { statusCode: 401 /* Unauthorized */ });
      }
      this.reject(context, error);
    }
    await this.logger(logRequest, logArgs, logResult);
  }
}
