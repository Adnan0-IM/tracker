export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  DB_HOST: process.env.DB_HOST ?? "localhost", // change it to db for production
  DB_PORT: Number(process.env.DB_PORT ?? 5432),
  DB_NAME: process.env.DB_NAME ?? "expense_tracker",
  DB_USER: process.env.DB_USER ?? "postgres",
  DB_PASSWORD_FILE: process.env.DB_PASSWORD_FILE,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PASS: process.env.DB_PASS
};
