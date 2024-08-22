import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";
import * as schema from "@/database/schemas";

const queryClient = postgres(env.DATABASE_URL);
const db = drizzle(queryClient, { schema, logger: true });

export default db;
