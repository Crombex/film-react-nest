import { Module, Global, DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { FilmEntity } from '../films/entity/film.entity';
import { ScheduleEntity } from '../films/entity/schedule.entity';
import { DataSourceOptions } from 'typeorm';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) =>
            ({
              type: config.get<DataSourceOptions['type']>('DATABASE_DRIVER'),
              host: config.get<string>('DATABASE_HOST'),
              port: config.get<number>('DATABASE_PORT'),
              username: config.get<string>('DATABASE_USERNAME'),
              password: config.get<string>('DATABASE_PASSWORD'),
              database: config.get<string>('DATABASE_NAME'),
              migrations: [],
              entities: [FilmEntity, ScheduleEntity],
              synchronize: false,
            }) as TypeOrmModuleOptions,
        }),
      ],
    };
  }
}
