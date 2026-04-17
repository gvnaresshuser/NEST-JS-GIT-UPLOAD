import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

//export const users = pgTable('users', {
export const users = pgTable('nestjs_concepts_users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 100 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
});