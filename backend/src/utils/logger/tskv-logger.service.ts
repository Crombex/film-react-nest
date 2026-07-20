import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TSKVLogger implements LoggerService {
  formatLog(level: string, message: any, ...params: any[]) {
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

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatLog('log', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatLog('warn', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatLog('error', message, ...optionalParams));
  }
}
