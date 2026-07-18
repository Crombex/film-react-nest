import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './app-exception.filter';
import { ConfigService } from '@nestjs/config';
import { collectErrors } from './utils/errors';
import { ValidationPipeErrorException } from './exceptions/validation-pipe-error.exception';
import { createLogger } from './utils/logger/logger.fabric';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = collectErrors(errors);
        throw new ValidationPipeErrorException(formattedErrors);
      },
    }),
  );
  app.setGlobalPrefix('api/afisha');
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  app.useLogger(createLogger(configService))
  await app.listen(port);
}
bootstrap();
