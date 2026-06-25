import { HttpStatus, HttpException } from '@nestjs/common';

export class FilmNotFound extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
