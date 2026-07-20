import { expect, describe, it, jest, beforeEach } from '@jest/globals';
import { TSKVLogger } from './tskv-logger.service';

describe('TSKVLogger', () => {
  let tskvLogger: TSKVLogger;
  const log = {
    message: 'some interesting information',
    optionalParams: [
      { from: 'Alice' },
      { to: 'Bob' },
      { encoding: 'SHA256' },
      'practicum.yandex.ru',
    ],
  };

  beforeEach(() => {
    tskvLogger = new TSKVLogger();
  });

  it('.log() should log message with "log" level', () => {
    jest.spyOn(tskvLogger, 'formatLog');
    jest.spyOn(console, 'log').mockImplementation(() => {});

    tskvLogger.log(log.message, ...log.optionalParams);

    expect(tskvLogger.formatLog).toHaveBeenCalledWith(
      'log',
      log.message,
      ...log.optionalParams,
    );
    expect(console.log).toHaveBeenCalledWith(
      tskvLogger.formatLog('log', log.message, ...log.optionalParams),
    );
  });

  it('.error() should log message with "error" level', () => {
    jest.spyOn(tskvLogger, 'formatLog');
    jest.spyOn(console, 'error').mockImplementation(() => {});

    tskvLogger.error(log.message, ...log.optionalParams);

    expect(tskvLogger.formatLog).toHaveBeenCalledWith(
      'error',
      log.message,
      ...log.optionalParams,
    );
    expect(console.error).toHaveBeenCalledWith(
      tskvLogger.formatLog('error', log.message, ...log.optionalParams),
    );
  });

  it('.warn() should log message with "warn" level', () => {
    jest.spyOn(tskvLogger, 'formatLog');
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    tskvLogger.warn(log.message, ...log.optionalParams);

    expect(tskvLogger.formatLog).toHaveBeenCalledWith(
      'warn',
      log.message,
      ...log.optionalParams,
    );
    expect(console.warn).toHaveBeenCalledWith(
      tskvLogger.formatLog('warn', log.message, ...log.optionalParams),
    );
  });

  it('.formatLog() should correct transform log', () => {
    const tskvLog = tskvLogger.formatLog(
      'log',
      log.message,
      ...log.optionalParams,
    );

    const expectedValue =
      [
        `level=log`,
        `message=${log.message}`,
        `from=Alice`,
        `to=Bob`,
        `encoding=SHA256`,
        `param=practicum.yandex.ru`,
      ].join('\t') + '\n';

    expect(tskvLog).toBe(expectedValue);
  });
});
