import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { users, type InsertUser, type SelectUser } from "../db/schema";
import type { IUserService } from "../interfaces/User.interface";
import type { ServiceResponse } from "../types/ServiceResponse.type";
import { eq } from "drizzle-orm";


export class UserService implements IUserService {
    private db: PostgresJsDatabase;
    private usersTable: typeof users;

    public constructor(db: PostgresJsDatabase) {
        this.db = db;
        this.usersTable = users
    }

    public async insertUser(data: InsertUser): Promise<ServiceResponse<SelectUser | unknown>> {
        try {
            const [userCreated] = await this.db.insert(this.usersTable).values(data).returning()
            return {
                data: userCreated,
                message: "CREATED"
            }
        } catch (error) {
            return {
                data: error,
                message: "INTERNAL_SERVER_ERROR"
            }
        }
    }

    public async selectUserById(id: SelectUser['id']): Promise<ServiceResponse<SelectUser | unknown>> {
        try {
            const [user] = await this.db.select().from(this.usersTable).where(eq(this.usersTable.id, id));
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
            return {
                data: error,
                message: "INTERNAL_SERVER_ERROR"
            }
        }
    }

    public async selectUserByEmail(email: SelectUser['email']): Promise<ServiceResponse<SelectUser | unknown>> {
        try {
            const [foundUser] = await this.db.select().from(this.usersTable).where(eq(this.usersTable.email, email));
            if (!foundUser) {
                return {
                    message: "NOT_FOUND"
                }
            }
            return {
                data: foundUser,
                message: "OK"
            }
        } catch (e) {
            return {
                data: e,
                message: "INTERNAL_SERVER_ERROR"
            }
        }
    }
}