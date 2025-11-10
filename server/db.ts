import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const DATABASE_URL = process.env.DATABASE_URL;

let dbInstance: any = null;

if (DATABASE_URL) {
  console.log("✓ Database connection established");
  const pool = new Pool({ connectionString: DATABASE_URL });
  dbInstance = drizzle({ client: pool, schema });
} else {
  console.log("⚠ No DATABASE_URL found - database features disabled");
}

export const db = dbInstance;
