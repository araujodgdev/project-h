import {boolean, integer, pgTable, varchar, text, timestamp, serial } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: text('full_name').notNull(),
    username: text('username').notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
})

export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    likesCount: integer('likes_count').default(0),
    commentsCount: integer('comments_count').default(0),
    isDeleted: boolean('is_deleted').default(false),
})

export const usersRelations = relations(users, ({many}) => ({posts: many(posts)}))
export const postsRelations = relations(posts, ({one}) => ({user: one(users, {fields: [posts.userId], references: [users.id]})}))

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertPost = typeof posts.$inferInsert
export type SelectPost = typeof posts.$inferSelect