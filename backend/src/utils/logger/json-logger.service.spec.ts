import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { JsonLogger } from './json-logger.service';

describe('JSONLogger', () => {
  let jsonLogger: JsonLogger;
  const log = {
    message: 'some interesting information',
    optionalParams: [{ from: 'Alice' }, { to: 'Bob' }, { encoding: 'SHA256' }],
  };

  beforeEach(() => {
    jsonLogger = new JsonLogger();
  });

  it('.log() should return JSON string with "log" level', () => {
    jest.spyOn(jsonLogger, 'formatMessage');
    jest.spyOn(console, 'log').mockImplementation(() => {});

    jsonLogger.log(log.message, ...log.optionalParams);
    expect(jsonLogger.formatMessage).toHaveBeenCalledWith(
      'log',
      log.message,
      log.optionalParams,
    );

    expect(console.log).toHaveBeenCalledWith(
      jsonLogger.formatMessage('log', log.message, log.optionalParams),
    );
  });

  it('.error() should return JSON string with "error" level', () => {
    jest.spyOn(jsonLogger, 'formatMessage');
    jest.spyOn(console, 'error').mockImplementation(() => {});

    jsonLogger.error(log.message, ...log.optionalParams);
    expect(jsonLogger.formatMessage).toHaveBeenCalledWith(
      'error',
      log.message,
      log.optionalParams,
    );

    expect(console.error).toHaveBeenCalledWith(
      jsonLogger.formatMessage('error', log.message, log.optionalParams),
    );
  });

  it('.warn() should return JSON string with "warn" level', () => {
    jest.spyOn(jsonLogger, 'formatMessage');
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    jsonLogger.warn(log.message, ...log.optionalParams);
    expect(jsonLogger.formatMessage).toHaveBeenCalledWith(
      'warn',
      log.message,
      log.optionalParams,
    );

    expect(console.warn).toHaveBeenCalledWith(
      jsonLogger.formatMessage('warn', log.message, log.optionalParams),
    );
  });
});
