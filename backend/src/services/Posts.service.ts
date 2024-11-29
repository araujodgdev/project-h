import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { posts, type SelectPost } from "../db/schema";
import type { ServiceResponse } from "../types/ServiceResponse.type";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../db/schema";

export default class PostService {
    private db: PostgresJsDatabase<typeof schema>
    private postsTable: typeof posts;

    public constructor() {
        this.db = db;
        this.postsTable = posts;
    }

    public async insertPost(data: any): Promise<ServiceResponse<SelectPost>> {
        try {
            const [postCreated] = await this.db.insert(this.postsTable).values(data).returning()
            return {
                data: postCreated,
                message: "CREATED"
            }
        } catch (error: any) {
            return {
                data: error,
                message: "INTERNAL_SERVER_ERROR"
            }
        }
    }

    public async deletePost(id: number): Promise<ServiceResponse<SelectPost>> {
        try {
            const [postDeleted] = await this.db.update(this.postsTable).set({ isDeleted: true }).where(eq(this.postsTable
                .id, id)).returning()
            if (!postDeleted) {
                return {
                    data: postDeleted,
                    message: "NOT_FOUND"
                }
            }

            return {
                data: postDeleted,
                message: "OK"
            }
        } catch (error: any) {
            return {
                data: error,
                message: "INTERNAL_SERVER_ERROR"
            }
        }
    }

    public async getPosts(): Promise<ServiceResponse<SelectPost[]>> {
        try {
            const posts = await this.db.query.posts.findMany({with: {
                user: true,
            }, orderBy: [desc(this.postsTable.id)]})
            
            return {
                data: posts,
                message: "OK"
            }
        } catch (error: any) {
            return {
                data: error,
                message: "INTERNAL_SERVER_ERROR"
            }
        }
    }
}