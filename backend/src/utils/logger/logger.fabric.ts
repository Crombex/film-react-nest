import { LoggerService } from '@nestjs/common';
import { TSKVLogger } from './tskv-logger.service';
import { DevLogger } from './dev-logger.service';
import { JsonLogger } from './json-logger.service';
import { ConfigService } from '@nestjs/config';

export function createLogger(configService: ConfigService): LoggerService {
  const loggerType = configService.get<string>('LOGGER');
  switch (loggerType) {
    case 'DEV':
      return new DevLogger();
    case 'JSON':
      return new JsonLogger();
    case 'TSKV':
      return new TSKVLogger();
    default:
      return new DevLogger();
  }
}
