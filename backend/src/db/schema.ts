import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    nickName: varchar({ length: 50 }).notNull(),
        email: varchar({ length: 255 }).notNull().unique(),
        age: integer()
})

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect