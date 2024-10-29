import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { posts, type SelectPost } from "../db/schema";
import type { ServiceResponse } from "../types/ServiceResponse.type";

export default class PostService {
    private db: PostgresJsDatabase;
    private postsTable: typeof posts;

    public constructor(db: PostgresJsDatabase) {
        this.db = db;
        this.postsTable = posts;
    }

    public async insertPost(data: any): Promise<ServiceResponse<SelectPost>> {
        try {
            const [ postCreated ] = await this.db.insert(this.postsTable).values(data).returning()
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

}