import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export const DRIZZLE = 'DRIZZLE_DB';

//configService-WAY

@Module({
    providers: [
        {
            provide: DRIZZLE,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const databaseUrl = configService.get<string>('DATABASE_URL');

                console.log('DATABASE_URL from ConfigService:', databaseUrl);

                const pool = new Pool({
                    connectionString: databaseUrl,
                    ssl: {
                        rejectUnauthorized: false,
                    },
                });

                return drizzle(pool);
            },
        },
    ],
    exports: [DRIZZLE],
})
export class DatabaseModule { }
//--------------------------- configService WAY -------------------------------------
/*

//1. Install @nestjs/config
//2. Import ConfigModule in AppModule and call forRoot() with isGlobal: true
//3. Create an instance of ConfigService and use it to read environment variables

/*
🚀 ✅ Step 1: Install ConfigModule (if not already)
pnpm add @nestjs/config

⚙️ ✅ Step 2: Enable ConfigModule (IMPORTANT)
app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere
    }),
    UsersModule,
  ],
})
export class AppModule {}
//-------------------------------------------------------
.env must be in root
drizzle-nest-basicsx/
 ├── .env ✅
 ├── src/

//pnpm start: dev
//pnpm db:studio

*/