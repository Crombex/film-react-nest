import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TSKVLogger implements LoggerService {
  formatLog(level: string, message: string, ...params: unknown[]) {
    const fields = [`level=${level}`, `message=${String(message)}`];

    for (const param of params) {
      if (typeof param === 'object' && param !== null) {
        fields.push(
          ...Object.entries(param).map(([key, value]) => `${key}=${value}`),
        );
      } else {
        fields.push(`param=${String(param)}`);
      }
    }

    return fields.join('\t') + '\n';
  }

  log(message: string, ...optionalParams: unknown[]) {
    console.log(this.formatLog('log', message, ...optionalParams));
  }

  warn(message: string, ...optionalParams: unknown[]) {
    console.warn(this.formatLog('warn', message, ...optionalParams));
  }

  error(message: string, ...optionalParams: unknown[]) {
    console.error(this.formatLog('error', message, ...optionalParams));
  }
}
