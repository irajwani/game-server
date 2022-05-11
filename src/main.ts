import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableShutdownHooks();

  const appConfig = app.get(ConfigService).get('app');
  if (appConfig.swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('Whatwapp Server')
      .setDescription('Service to handle games')
      .setVersion('0.0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentation', app, document);
  }

  const port: string | number = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
