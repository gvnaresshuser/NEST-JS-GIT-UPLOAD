import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot({
    isGlobal: true, // makes ConfigService available everywhere
  }),
    UsersModule, DatabaseModule],
})
export class AppModule { }
//pnpm add @nestjs/config
/*
//configService-WAY
const databaseUrl = configService.get<string>('DATABASE_URL');

//dotenv/config-WAY
import 'dotenv/config';
connectionString: process.env.DATABASE_URL,
*/
