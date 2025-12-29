import type postgres from "postgres";

// Initialize schema (multi-statement)
export const initialize = async (db: ReturnType<typeof postgres>) => {
  await db.unsafe(`
  -- USERS
  CREATE TABLE IF NOT EXISTS "Users" (
    id          SERIAL PRIMARY KEY,
    email       TEXT UNIQUE NOT NULL,
    password    TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
  );

  -- CATEGORIES
  CREATE TABLE IF NOT EXISTS "Category" (
    id    TEXT PRIMARY KEY,
    name  TEXT NOT NULL,
    icon  TEXT,
    color TEXT
  );

  -- PERIOD TYPE LOOKUP
  CREATE TABLE IF NOT EXISTS "PeriodType" (
    value TEXT PRIMARY KEY
  );
  INSERT INTO "PeriodType"(value)
    VALUES ('WEEKLY'), ('MONTHLY'), ('YEARLY')
  ON CONFLICT DO NOTHING;

  -- REPORT TYPE LOOKUP
  CREATE TABLE IF NOT EXISTS "ReportType" (
    value TEXT PRIMARY KEY
  );
  INSERT INTO "ReportType"(value)
    VALUES ('WEEKLY'), ('MONTHLY'), ('YEARLY'), ('CUSTOM')
  ON CONFLICT DO NOTHING;

  -- BUDGETS
  CREATE TABLE IF NOT EXISTS "Budget" (
    id             TEXT PRIMARY KEY,
    userId         INTEGER NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    categoryId     TEXT NOT NULL REFERENCES "Category"(id),
    periodType     TEXT NOT NULL REFERENCES "PeriodType"(value),
    amount         NUMERIC(12,2) NOT NULL,
    alertThreshold INTEGER DEFAULT 80,
    UNIQUE(userId, categoryId, periodType)
  );

  -- EXPENSES
  CREATE TABLE IF NOT EXISTS "Expense" (
    id          TEXT PRIMARY KEY,
    userId      INTEGER NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    categoryId  TEXT NOT NULL REFERENCES "Category"(id),
    amount      NUMERIC(12,2) NOT NULL,
    currency    TEXT DEFAULT 'USD',
    description TEXT,
    spentAt     TIMESTAMPTZ NOT NULL,
    createdAt   TIMESTAMPTZ DEFAULT NOW(),
    updatedAt   TIMESTAMPTZ DEFAULT NOW(),
    deletedAt   TIMESTAMPTZ
  );

  -- REPORTS
  CREATE TABLE IF NOT EXISTS "Report" (
    id          TEXT PRIMARY KEY,
    userId      INTEGER NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    reportType  TEXT NOT NULL REFERENCES "ReportType"(value),
    generatedAt TIMESTAMPTZ DEFAULT NOW(),
    filePath    TEXT NOT NULL
  );

  -- HELPFUL INDEXES
  CREATE INDEX IF NOT EXISTS idx_expense_user     ON "Expense"(userId);
  CREATE INDEX IF NOT EXISTS idx_expense_category ON "Expense"(categoryId);
  CREATE INDEX IF NOT EXISTS idx_expense_spentAt  ON "Expense"(spentAt);
  CREATE INDEX IF NOT EXISTS idx_budget_user      ON "Budget"(userId);
  CREATE INDEX IF NOT EXISTS idx_report_user      ON "Report"(userId);

  -- updatedAt trigger
  CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
  BEGIN NEW."updatedAt" = NOW(); RETURN NEW; END;
  $$ LANGUAGE plpgsql;
  DROP TRIGGER IF EXISTS expense_set_updated_at ON "Expense";
  CREATE TRIGGER expense_set_updated_at
    BEFORE UPDATE ON "Expense"
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
`);
};
