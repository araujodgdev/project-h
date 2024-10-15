import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const user = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({length: 255}).notNull(),
    nickName: varchar({length: 50}).notNull(),
    email: varchar({length: 255}).notNull().unique()

})