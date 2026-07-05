import { HttpStatus, HttpException } from '@nestjs/common';

export class ScheduleNotFound extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
