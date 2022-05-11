import { Module } from '@nestjs/common';
import ConfigurationModule from './Configurations/Config/config.module';
import { HealthModule } from './Health/health.module';
import { UserModule } from './User/user.module';
import { DatabaseModule } from './Configurations/DB/database.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, HealthModule, UserModule],
})
export class AppModule {}
