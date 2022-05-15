import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import ConfigurationModule from './Configurations/Config/config.module';
import { HealthModule } from './Health/health.module';
import { UserModule } from './User/user.module';
import { ClubModule } from './Club/club.module';
import { DatabaseModule } from './Configurations/DB/database.module';
import { AuthMiddleware } from './Common/Middleware/auth.middleware';
import { ClubController } from './Club/club.controller';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
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
