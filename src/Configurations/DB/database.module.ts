import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import DatabaseConfig from './database-config';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfig],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('db').pgHost,
          port: configService.get('db').pgPort,
          username: configService.get('db').pgUser,
          password: configService.get('db').pgPassword,
          database: configService.get('db').pgDb,
          entities: [path.join(__dirname, '/../../**/*.entity{.ts,.js}')],
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
