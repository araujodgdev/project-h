import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

async function main() {
    const client = postgres(process.env.DATABASE_URL as any, {prepare: false});
    const db = drizzle(client);

}

main();