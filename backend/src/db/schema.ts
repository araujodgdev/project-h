import { integer, pgTable, varchar, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    fullName: text('full_name').notNull(),
    username: text().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
})

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect