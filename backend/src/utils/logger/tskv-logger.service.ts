import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TSKVLogger implements LoggerService {
  formatLog(level: string, message: any, ...params: any[]) {
    return [
      `level=${level}`,
      `message=${String(message)}`,
      `params=${params.map(elem => String(elem)).join(', ')}`,
      `timestamp=${new Date().toISOString()}`
    ].join('\t') + '\n'
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatLog('log', message, ...optionalParams))
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatLog('warn', message, ...optionalParams))
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatLog('error', message, ...optionalParams))
  }
}