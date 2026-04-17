import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './users/interceptors/response.interceptor';
import { HttpExceptionFilter } from './users/filters/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
