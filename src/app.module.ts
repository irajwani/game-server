import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { Level as LogLevel } from 'pino';
import ConfigurationModule from './Configurations/Config/config.module';
import { HealthModule } from './Health/health.module';
import { UserModule } from './User/user.module';
import { ClubModule } from './Club/club.module';
import { DatabaseModule } from './Configurations/DB/database.module';
import { AuthMiddleware } from './Common/Middleware/auth.middleware';
import { ClubController } from './Club/club.controller';
import { hostname } from 'os';
import { IncomingMessage } from 'http';

const pinoHttpConfig = {
  colorize: !process.env.AWS_REGION,
  levelFirst: true,
  translateTime: 'SYS:dd/mm/yyyy | HH:MM:ss',
  ignore: 'pid,hostname,name',
  transport: 'pino-pretty',
};

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    LoggerModule.forRoot({
      pinoHttp: {
        useLevel: (process.env.LOG_LEVEL as LogLevel) || 'info',
        redact: ['output', 'isBoom', 'isServer', 'data'],
        genReqId: (request: IncomingMessage) =>
          `${Date.now()}-${hostname}-${request.method}-${request.url}`,
        autoLogging: {
          ignorePaths: ['/health'],
        },
        transport:
          process.env.NODE_ENV === 'dev'
            ? { target: 'pino-pretty', options: pinoHttpConfig }
            : undefined,
      },
      exclude: [{ method: RequestMethod.GET, path: '/health' }],
    }),
    HealthModule,
    UserModule,
    ClubModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ClubController);
  }
}
