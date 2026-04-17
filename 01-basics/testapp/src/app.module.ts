import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

import { MiddlewareConsumer,  NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
//import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
//export class AppModule {}
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // apply to all routes - .forRoutes('users'); - ONLY for users route
  }
}
