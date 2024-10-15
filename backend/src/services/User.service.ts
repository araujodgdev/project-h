import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { users, type InsertUser, type SelectUser } from "../db/schema";
import type { IUserService } from "../interfaces/User.interfaces";
import type { ServiceResponse } from "../types/ServiceResponse.type";
import { eq } from "drizzle-orm";


export class UserService implements IUserService {
    private db: PostgresJsDatabase;
    private usersTable: typeof users;

    public constructor(db: PostgresJsDatabase) {
        this.db = db;
        this.usersTable = users
    }

    public async insertUser(data: InsertUser): Promise<ServiceResponse<SelectUser>> {
        try {
            const [ userCreated ] = await this.db.insert(this.usersTable).values(data).returning()
            return {
                data: userCreated,
                message: "CREATED"
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }
    
    public async selectUserById(id: SelectUser['id']): Promise<ServiceResponse<SelectUser>> {
        try {
            const [ user ] = await this.db.select().from(this.usersTable).where(eq(this.usersTable.id, id));
            if (!user) {
                return {
                    message: "NOT_FOUND"
                }
            }
            return {
                data: user,
                message: "OK"
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }
}