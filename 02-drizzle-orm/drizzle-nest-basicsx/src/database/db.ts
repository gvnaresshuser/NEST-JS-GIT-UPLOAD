import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
console.log('DATABASE_URL from process.env:', process.env.DATABASE_URL); // ✅ Debug log

//dotenv/config-WAY

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // IMPORTANT for Render
    },
});

export const db = drizzle(pool);