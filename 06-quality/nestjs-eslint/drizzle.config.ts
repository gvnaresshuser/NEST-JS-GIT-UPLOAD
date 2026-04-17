import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
//E:\MURALI\NEST-JS\nestjs-eslint\drizzle.config.ts
//pnpm exec eslint drizzle.config.ts --fix
