import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Set to false to disable automatic transformation of payloads to DTO instances
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//whitelist: true - removes any properties that are not defined in the DTO class
//forbidNonWhitelisted: true - throws an error if any properties that are not defined in the DTO class are present in the request
//transform: true - automatically transforms payloads to be objects typed according to their DTO classes
