import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('nestjs_users_new', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  password: text('password'),
  address: text('address'),
  profession: text('profession')
});
/*
2️⃣ 
text('name')

👉 This defines:

Part	  Meaning
text	  PostgreSQL column type
'name'	actual column name in DB

drizzle-kit - management - generate,migrate
pnpm drizzle-kit generate
pnpm drizzle-kit migrate

drizzle-orm - queries

*/