import {boolean, integer, pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    fullName: text('full_name').notNull(),
    username: text().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
})

export const posts = pgTable('posts', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    likesCount: integer('likes_count').default(0),
    commentsCount: integer('comments_count').default(0),
    isDeleted: boolean('is_deleted').default(false),
})

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertPost = typeof posts.$inferInsert
export type SelectPost = typeof posts.$inferSelect