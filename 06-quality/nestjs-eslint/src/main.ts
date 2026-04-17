//import { NestFactory, Reflector } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './users/interceptors/response.interceptor';
import { HttpExceptionFilter } from './users/filters/http-exception/http-exception.filter';
//------------------- SWAGGER ------------------------------
// 🔥 Swagger imports
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//------------------- SWAGGER ------------------------------

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //------------------- SWAGGER ------------------------------
  // 🔥 Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Test Project API')
    .setDescription('NestJS Users Module with Drizzle ORM')
    .setVersion('1.0')
    .addBearerAuth() // for JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  //------------------- SWAGGER ------------------------------
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //Apply Interceptor (Global)
  app.useGlobalInterceptors(new ResponseInterceptor());

  //Create Exception Filter - Apply Globally
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
  //await app.listen(process.env.PORT || 3000); //- IN LIVE DEPLOYMENT ?? NOT WORKING
}
bootstrap();
