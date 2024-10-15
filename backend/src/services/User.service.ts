import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { users, type InsertUser, type SelectUser } from "../db/schema";

export interface IUserService {
    insertUser: (data: InsertUser) => Promise<SelectUser | Error>
}

export class UserService implements IUserService {
    private db: PostgresJsDatabase;
    private usersTable: typeof users;

    public constructor(db: PostgresJsDatabase) {
        this.db = db;
        this.usersTable = users
    }

    public async insertUser(data: InsertUser): Promise<SelectUser | Error> {
        try {
            const [ userCreated ] = await this.db.insert(this.usersTable).values(data).returning()
            return userCreated
        } catch (error) {
            throw new Error(error as string)
        }
    }
}