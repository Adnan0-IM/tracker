import postgres from "postgres";
import { env } from "./env";

async function readDbPassword(): Promise<string | undefined> {
  const file = env.DB_PASSWORD_FILE;
  if (file) {
    try {
      const txt = await Bun.file(file).text();
      return txt.trim();
    } catch (error) {
      console.error("Failed to read DB password file:", error);
    }
  }
  // Fallback for local dev (no secret file)
  return env.DB_PASSWORD ?? env.DB_PASS;
}

let sqlPromise: Promise<ReturnType<typeof postgres>> | null = null;

async function getDb() {
  if (!sqlPromise) {
    sqlPromise = (async () => {
      const password = await readDbPassword();
      const sql = postgres({
        host: env.DB_HOST,
        port: env.DB_PORT,
        database: env.DB_NAME,
        username: env.DB_USER,
        password,
        max: 10, // pool sizw
        ssl: "prefer",
      });
      await sql`select 1`;
      console.log(
        `DB connected: ${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME} as ${env.DB_USER}`
      );
      return sql;
    })();
  }
  return sqlPromise;
}

export default getDb;
